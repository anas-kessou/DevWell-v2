import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as BarCodeScanner from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cssInterop } from 'nativewind';
import { 
  QrCode, 
  Bluetooth, 
  Zap, 
  Activity, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Loader2,
  TriangleAlert,
  Power,
  RefreshCw
} from 'lucide-react-native';

// Allow lucide icons to use NativeWind classes
cssInterop(Bluetooth, { className: 'style' });
cssInterop(Monitor, { className: 'style' });
cssInterop(Activity, { className: 'style' });
cssInterop(QrCode, { className: 'style' });
cssInterop(Zap, { className: 'style' });
cssInterop(Wifi, { className: 'style' });
cssInterop(Power, { className: 'style' });
cssInterop(RefreshCw, { className: 'style' });
import { firebaseService } from '../services/firebaseService';

type ProbePhase = 'scan' | 'scanning' | 'syncing' | 'stream' | 'standby';

const { width, height } = Dimensions.get('window');

const RemoteProbe: React.FC = () => {
  const [phase, setPhase] = useState<ProbePhase>('scan');
  const [syncCode, setSyncCode] = useState<string>('');
  const [hostId, setHostId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('back');
  
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const intervalRef = useRef<any>(null);

  // Biometric Mock Data state
  const [vocalTension, setVocalTension] = useState<number>(12);
  const [uplinkStability, setUplinkStability] = useState<number>(98);

  // Load persisted host on mount
  useEffect(() => {
    const checkSavedHost = async () => {
      const savedHost = await AsyncStorage.getItem('devwell_host_id');
      if (savedHost) {
        setHostId(savedHost);
      }
    };
    checkSavedHost();
  }, []);

  // Listen to Session State
  useEffect(() => {
    if (!hostId) return;

    const unsub = firebaseService.onSessionStateChange(hostId, (state) => {
      if (state.activeSource === 'web' && phase === 'stream') {
        // Web took control -> Switch to standby
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase('standby');
      } else if (state.activeSource === 'mobile' && phase === 'standby') {
        // We took control via Web signal or Re-activate
        setPhase('stream');
        startStreaming(hostId);
      }
    });
    return () => unsub();
  }, [hostId, phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // --- Handlers ---

  const handleCodeChange = (text: string) => {
    setSyncCode(text.trim());
    setError(null);
  };

  const verifyAndConnect = async (code: string) => {
    setError(null);
    try {
      const connection = await firebaseService.verifySyncCode(code);
      setHostId(connection.hostId);
      await AsyncStorage.setItem('devwell_host_id', connection.hostId);
      setPhase('stream');
      startStreaming(connection.hostId);
    } catch (err) {
      setPhase('scan');
      setError("INVALID OR EXPIRED SESSION");
    }
  };

  const handleSync = async () => {
    if (syncCode.length < 5) {
      setError("ENTER VALID HOST CODE");
      return;
    }
    setPhase('syncing');
    await verifyAndConnect(syncCode);
  };

  const startStreaming = async (id: string) => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        setError("CAMERA ACCESS DENIED");
        setPhase('scan');
        return;
      }
    }

    // Signal active source
    await firebaseService.setSessionActiveSource(id, 'mobile');

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(async () => {
      await captureAndSendFrame(id);
      // Update mock biometrics
      setVocalTension(prev => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))));
      setUplinkStability(prev => Math.max(80, Math.min(100, prev + (Math.random() * 4 - 2))));
    }, 2000); // 2 second interval for native to avoid overload
  };

  const captureAndSendFrame = async (id: string) => {
    if (!cameraRef.current) return;
    
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.3,
        base64: true,
        scale: 0.5
      });
      
      if (photo?.base64) {
        const base64Data = `data:image/jpeg;base64,${photo.base64}`;
        firebaseService.streamDataToHost(id, base64Data, {
          timestamp: Date.now(),
          vocalTension: vocalTension
        });
      }
    } catch (e) {
      console.error("Frame capture failed", e);
    }
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (phase === 'scanning') {
      setPhase('syncing');
      setSyncCode(data);
      verifyAndConnect(data);
    }
  };

  const toggleCamera = () => {
    setCameraFacing(prev => prev === 'back' ? 'front' : 'back');
  };

  const handleTerminate = async () => {
    if (hostId) await firebaseService.terminateSession(hostId);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHostId(null);
    await AsyncStorage.removeItem('devwell_host_id');
    setPhase('scan');
    setSyncCode('');
  };

  // --- Renderers ---

  if (phase === 'scanning') {
    return (
      <View className="flex-1 bg-black items-center justify-center p-8">
        <Text className="text-xl font-bold tracking-[0.2em] text-white uppercase mb-8">Neural Scan</Text>
        <View className="w-64 h-64 border-2 border-blue-500 rounded-2xl overflow-hidden mb-8">
          <CameraView 
            style={StyleSheet.absoluteFill} 
            facing="back"
            onBarcodeScanned={handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        </View>
        <TouchableOpacity 
          onPress={() => setPhase('scan')}
          className="px-8 py-3 bg-slate-900 border border-slate-700 rounded-full"
        >
          <Text className="text-slate-500 uppercase font-bold tracking-widest text-xs">Cancel Scan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (phase === 'scan') {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-black p-6"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="mb-8 relative items-center justify-center">
            <View className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl" />
            <Activity size={64} color="#3b82f6" />
          </View>
          
          <Text className="text-2xl font-bold tracking-[0.2em] text-blue-100 mb-2 text-center uppercase">
            Neural Probe
          </Text>
          <Text className="text-slate-400 text-[10px] tracking-widest mb-12 font-mono text-center">
            PROTOCOL V.3.0 // READY TO SYNC
          </Text>

          <View className="w-full max-w-xs space-y-6">
            <View>
              <Text className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2 ml-1">
                Manual Frequency Code
              </Text>
              <TextInput 
                value={syncCode}
                onChangeText={handleCodeChange}
                placeholder="Paste Session ID"
                placeholderTextColor="#1e293b"
                className="w-full bg-slate-900/50 border border-slate-700 text-center text-sm font-mono text-white py-4 rounded-xl"
              />
              {error && (
                <View className="flex-row items-center space-x-2 mt-2">
                  <TriangleAlert size={12} color="#f87171" />
                  <Text className="text-red-400 text-[10px] font-mono">{error}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity 
              onPress={handleSync}
              disabled={syncCode.length < 5}
              className={`w-full py-4 rounded-xl flex-row items-center justify-center space-x-2 ${syncCode.length >= 5 ? 'bg-blue-600' : 'bg-slate-800'}`}
            >
              <Zap size={16} color={syncCode.length >= 5 ? "white" : "#64748b"} />
              <Text className={`font-bold tracking-widest uppercase text-xs ${syncCode.length >= 5 ? 'text-white' : 'text-slate-500'}`}>
                Initiate Handshake
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center space-x-4">
              <View className="flex-1 h-[1px] bg-slate-800" />
              <Text className="text-slate-600 text-[10px] uppercase tracking-widest">Or</Text>
              <View className="flex-1 h-[1px] bg-slate-800" />
            </View>

            <TouchableOpacity 
              onPress={async () => {
                const { granted } = await requestPermission();
                if (granted) setPhase('scanning');
              }}
              className="w-full border border-slate-700 bg-slate-800/20 py-4 rounded-xl flex-row items-center justify-center space-x-3"
            >
              <QrCode size={20} color="#60a5fa" />
              <Text className="text-slate-300 tracking-widest text-[10px] font-bold uppercase">Scan Host Matrix</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (phase === 'syncing') {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Bluetooth size={64} color="#60a5fa" className="animate-pulse" />
        <Text className="text-white font-bold tracking-widest uppercase mt-8">Searching for Host</Text>
        <Text className="text-blue-400 font-mono text-xs mt-2">BEACON: {syncCode}</Text>
      </View>
    );
  }

  if (phase === 'standby') {
    return (
      <View className="flex-1 bg-black items-center justify-center p-8">
        <Monitor size={64} color="#475569" className="mb-4" />
        <Text className="text-xl font-bold tracking-widest text-slate-400 uppercase text-center">Host Camera Active</Text>
        <Text className="text-slate-600 text-[10px] font-mono mb-8 text-center uppercase">Remote Sensors Overridden</Text>
        <TouchableOpacity 
          onPress={() => {
            setPhase('stream');
            if (hostId) startStreaming(hostId);
          }}
          className="bg-blue-600/20 border border-blue-500/50 px-8 py-4 rounded-full"
        >
          <Text className="text-blue-400 font-bold tracking-widest uppercase text-xs">Re-Activate Sensor</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Viewfinder */}
      <View className="flex-1 relative">
        <CameraView 
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={cameraFacing}
        />
        
        {/* Overlays */}
        <View className="absolute inset-0 pointer-events-none">
          <View className="absolute top-10 left-4 right-4 flex-row justify-between items-start">
            <View>
              <View className="flex-row items-center space-x-2">
                <View className="w-2 h-2 rounded-full bg-green-500" />
                <Text className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">Live Feed</Text>
              </View>
              <Text className="text-xs text-white font-bold uppercase tracking-wider mt-1">{hostId?.substring(0, 8)}</Text>
            </View>
            <View className="bg-slate-900/80 px-3 py-1 rounded-full flex-row items-center space-x-2 border border-slate-700">
               <Wifi size={12} color={uplinkStability > 90 ? "#4ade80" : "#facc15"} />
               <Text className="text-[10px] font-mono text-slate-300">{uplinkStability}%</Text>
            </View>
          </View>

          {/* Crosshair */}
          <View className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 border border-blue-400/20 rounded-full items-center justify-center">
             <View className="w-1 h-1 bg-blue-500 rounded-full" />
          </View>

          {/* Biometrics */}
          <View className="absolute bottom-10 left-4 right-4 space-y-3">
             <View className="bg-black/40 p-4 rounded-2xl border border-white/10">
                <View className="flex-row justify-between items-end mb-2">
                   <Text className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Vocal Tension</Text>
                   <Text className="text-sm font-mono text-white">{Math.round(vocalTension)}<Text className="text-[10px] text-slate-400 ml-1">Hz</Text></Text>
                </View>
                <View className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <View style={{ width: `${vocalTension}%`, height: '100%', backgroundColor: '#3b82f6' }} />
                </View>
             </View>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View className="p-6 bg-slate-950 border-t border-slate-900 flex-row space-x-3 pb-10">
        <TouchableOpacity 
          onPress={toggleCamera}
          className="flex-1 bg-slate-900 border border-blue-900/30 p-4 rounded-2xl items-center justify-center"
        >
          <RefreshCw size={24} color="#60a5fa" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleTerminate}
          className="flex-[3] bg-slate-900 border border-red-900/30 p-4 rounded-2xl flex-row items-center justify-center space-x-3"
        >
          <Power size={24} color="#ef4444" />
          <Text className="text-red-400 font-mono text-xs font-bold uppercase tracking-widest">Terminate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RemoteProbe;
