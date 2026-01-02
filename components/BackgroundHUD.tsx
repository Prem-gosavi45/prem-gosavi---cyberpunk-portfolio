import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

// Fix for strict type checking on Three.js intrinsic elements
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshPhysicalMaterial = 'meshPhysicalMaterial' as any;
const LineBasicMaterial = 'lineBasicMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const Fog = 'fog' as any;

// --- Types ---
interface CubeProps {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  blinkSpeed: number;
  delay: number;
}

const Cube: React.FC<CubeProps> = ({ position, size, color, speed, blinkSpeed, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  // Random rotation speed
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.2 * speed,
    y: (Math.random() - 0.5) * 0.2 * speed,
    z: (Math.random() - 0.5) * 0.1 * speed,
  }), [speed]);

  // Working vectors (memoized to prevent GC)
  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const ray = useMemo(() => new THREE.Ray(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const zeroVec = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * 0.01;
      meshRef.current.rotation.y += rotationSpeed.y * 0.01;
      meshRef.current.rotation.z += rotationSpeed.z * 0.01;

      // --- INTERACTION LOGIC ---
      
      // 1. Raycast from mouse
      // Normalize mouse (-1 to 1) -> World Ray
      vec.set(state.pointer.x, state.pointer.y, 0.5);
      vec.unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      ray.set(state.camera.position, dir);

      // 2. Get Cube World Position
      meshRef.current.getWorldPosition(worldPos);

      // 3. Distance check
      // We calculate distance from the Ray (infinite line) to the Cube center
      // This creates a "cylinder" of influence around the mouse cursor extending into the screen
      const distanceSq = ray.distanceSqToPoint(worldPos);
      const threshold = 15; // Interaction radius squared

      let intensityBoost = 0;

      if (distanceSq < threshold) {
          const distance = Math.sqrt(distanceSq);
          const maxDist = Math.sqrt(threshold);
          
          // Force decreases as distance increases
          const force = (1 - distance / maxDist) * 3; 

          // Calculate direction: Vector from Ray to Object
          // Get closest point on ray
          ray.closestPointToPoint(worldPos, vec);
          
          // Direction from closest point on ray TO the object
          // We calculate the push vector in world space, but apply it to the mesh position
          // Since the parent group handles the base position, mesh.position acts as an offset
          targetPos.subVectors(worldPos, vec).normalize().multiplyScalar(force);
          
          // Smoothly move towards the pushed position (Lerp for smooth physics)
          meshRef.current.position.lerp(targetPos, 0.1);
          
          intensityBoost = force * 1.5;
      } else {
          // Return to original position (0,0,0 relative to parent group)
          meshRef.current.position.lerp(zeroVec, 0.05);
      }
    
      // Blinking Effect (Pulse) + Interaction Glow
      const pulse = Math.sin(time * blinkSpeed + delay) * 0.5 + 0.5; // 0 to 1
      
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (material) {
        material.emissiveIntensity = (pulse * 2) + intensityBoost;
        material.opacity = 0.15 + (intensityBoost * 0.1);
      }
      
      if (edgesRef.current) {
          const edgeMat = edgesRef.current.material as THREE.LineBasicMaterial;
          if (edgeMat) {
            edgeMat.opacity = 0.2 + (pulse * 0.5) + (intensityBoost * 0.2);
            // Optional: Shift color slightly on hover
            if (intensityBoost > 0.5) {
                edgeMat.color.setHex(0xffffff);
            } else {
                edgeMat.color.set(color);
            }
          }
      }
    }
  });

  return (
    <Float 
        speed={speed} 
        rotationIntensity={0.5} 
        floatIntensity={0.5} 
        floatingRange={[-0.2, 0.2]}
    >
      <Group position={position}>
        <Mesh ref={meshRef}>
          <BoxGeometry args={[size, size, size]} />
          <MeshPhysicalMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent={true}
            opacity={0.15}
            roughness={0.1}
            metalness={0.1}
            transmission={0.5}
            thickness={1}
            side={THREE.DoubleSide}
          />
          {/* Edges component automatically uses parent geometry */}
          <Edges ref={edgesRef} threshold={15}>
             <LineBasicMaterial color={color} transparent opacity={0.4} />
          </Edges>
        </Mesh>
      </Group>
    </Float>
  );
};

const Scene: React.FC = () => {
    const cubes = useMemo(() => {
        const items = [];
        const colors = ["#00f0ff", "#7000ff", "#00ff9f"]; // Cyan, Purple, Green
        
        // Large background cubes
        for (let i = 0; i < 8; i++) {
            items.push({
                position: [
                    (Math.random() - 0.5) * 20, 
                    (Math.random() - 0.5) * 12, 
                    -5 - Math.random() * 10
                ] as [number, number, number],
                size: 1.5 + Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 0.5 + Math.random() * 0.5,
                blinkSpeed: 1 + Math.random(),
                delay: Math.random() * 10,
            });
        }

        // Medium mid-ground cubes
        for (let i = 0; i < 15; i++) {
            items.push({
                position: [
                    (Math.random() - 0.5) * 25, 
                    (Math.random() - 0.5) * 15, 
                    -2 - Math.random() * 5
                ] as [number, number, number],
                size: 0.5 + Math.random() * 0.8,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 1 + Math.random(),
                blinkSpeed: 1.5 + Math.random() * 1.5,
                delay: Math.random() * 10,
            });
        }

        // Small foreground cubes
        for (let i = 0; i < 5; i++) {
            items.push({
                position: [
                    (Math.random() - 0.5) * 15, 
                    (Math.random() - 0.5) * 10, 
                    0
                ] as [number, number, number],
                size: 0.2 + Math.random() * 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 1.5 + Math.random(),
                blinkSpeed: 2 + Math.random() * 2,
                delay: Math.random() * 10,
            });
        }
        
        return items;
    }, []);

    return (
        <>
            <AmbientLight intensity={0.5} color="#0a0a1f" />
            <PointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" distance={20} />
            <PointLight position={[-10, -10, -5]} intensity={1} color="#7000ff" distance={20} />
            
            <Fog attach="fog" args={['#020617', 5, 25]} />

            {cubes.map((props, i) => (
                <Cube key={i} {...props} />
            ))}
        </>
    );
};

const BackgroundHUD: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default BackgroundHUD;