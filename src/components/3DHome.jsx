import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center" style={{ color: "white", fontSize: "24px" }}>
        <p className="font-damion text-2xl">
            Loading {progress.toFixed(0)}%
            </p>
      </div>
    </Html>
  );
}

function ModelWithScreen({ url, text }) {
  const { scene } = useGLTF(url);
  const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
  const [displayText, setDisplayText] = useState("");
  const textIndex = useRef(0);
  const chairRef = useRef();

  useEffect(() => {
    const targetObject = scene.getObjectByName("monitor");
    const chair = scene.getObjectByName("chair");

    if (targetObject) {
      const position = new THREE.Vector3();
      targetObject.getWorldPosition(position);
      setTargetPosition([position.x + 0.2, position.y, position.z]);
      chairRef.current = chair;
    } else {
      console.log("No object");
    }
  }, [scene]);

  useEffect(() => {
    let interval;

    const startTyping = () => {
      setDisplayText("");
      textIndex.current = 0;

      interval = setInterval(() => {
        if (textIndex.current < text.length) {
          setDisplayText((prev) => prev + text.charAt(textIndex.current));
          textIndex.current += 1;
        } else {
          clearInterval(interval);
          // พักก่อนเริ่มใหม่
          setTimeout(startTyping, 1000); // รอ 1 วินาทีแล้วพิมพ์ใหม่
        }
      }, 100); // ความเร็วพิมพ์
    };

    startTyping();

    return () => clearInterval(interval);
  }, [text]);

  useFrame(() => {
    if (chairRef.current) {
      chairRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <primitive object={scene} />
      <Text
        //   position={[-0.8, 10.813647270202637, 5.9318342208862305]}
        // -1.0435408353805542,10.813647270202637,5.9318342208862305
        position={targetPosition}
        fontSize={0.45}
        fontWeight={700}
        color="#4A332D"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        {displayText}
      </Text>
    </>
  );
}

function SkyBox() {
  const texture = useLoader(THREE.TextureLoader, "/skybox.webp");
  return (
    <mesh>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial side={THREE.BackSide} map={texture} />
    </mesh>
  );
}

function BigTree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 8, 8]} />
        <meshStandardMaterial color="#8B5E3C" />
      </mesh>

      {/* Leaves - ชั้นล่าง */}
      <mesh position={[0, 9, 0]} castShadow>
        <coneGeometry args={[5, 4, 8]} />
        <meshStandardMaterial color="#D9884A" />
      </mesh>

      {/* Leaves - ชั้นบน */}
      <mesh position={[0, 12, 0]} castShadow>
        <coneGeometry args={[3.6, 3, 8]} />
        <meshStandardMaterial color="#D9884A" />
      </mesh>
    </group>
  );
}

function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
        <meshStandardMaterial color="#8B5E3C" />
      </mesh>

      {/* Leaves - ชั้นล่าง */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <coneGeometry args={[2.5, 2, 8]} />
        <meshStandardMaterial color="#D9884A" />
      </mesh>

      {/* Leaves - ชั้นบน */}
      <mesh position={[0, 6, 0]} castShadow>
        <coneGeometry args={[1.8, 1.5, 8]} />
        <meshStandardMaterial color="#D9884A" />
      </mesh>
    </group>
  );
}

function Rock({ position, scale = 1 }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial color="#7B5E57" />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#8B5E3C" />
    </mesh>
  );
}

function Cloud({ position, floatSpeed = 0.5, floatRange = 2 }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.x =
      position[0] + Math.sin(t * floatSpeed) * floatRange;
    ref.current.position.z =
      position[2] + Math.cos(t * floatSpeed) * floatRange;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
    </mesh>
  );
}

function ThreeDHome() {
  return (
    <>
      <div className="relative w-full h-full">
        <Canvas
          className="absolute top-0 left-0 w-full h-full"
          camera={{ position: [33, 17, 33] }}
        >
          <color attach="background" args={["#BFA180"]} />
          {/* สีพื้นหลังท้องฟ้าไล่สีน้ำตาลอ่อน */}
          {/* Ambient light ให้ความสว่างพื้นฐานทั้งห้อง */}
          <ambientLight intensity={0.1} color="#FFA27F" />
          {/* <ambientLight intensity={0.2} color="#FED049" /> */}
          <pointLight
            position={[3.6, 5, 1.42]}
            intensity={100}
            color="#D99759"
          />

          <pointLight
            position={[-5, 10, 20]}
            intensity={50}
            color="#D99759"
          />

          <pointLight
            position={[20, 10, -5]}
            intensity={50}
            color="#D99759"
          />

          <pointLight position={[-2, 13.8, 3]} intensity={50} color="#c77633" />
          <pointLight
            position={[-2, 13.8, 7.5]}
            intensity={50}
            color="#c77633"
          />
          <hemisphereLight
            position={[15, 19, -42]}
            skyColor="#d6923e"
            groundColor="#ccc"
            intensity={0.5}
          />
          <directionalLight
            position={[-4, 24, 25]}
            intensity={1}
            color="#ac6c2f"
          />
{/* 
          <Cloud position={[5, 15, 5]} />
          <Cloud position={[-8, 18, -3]} floatSpeed={0.3} floatRange={3} />
          <Cloud position={[12, 20, -10]} floatSpeed={0.7} floatRange={1.5} /> */}

          {/* ท้องฟ้าแบบ Sphere ใหญ่ ครอบ Scene */}
          <SkyBox />
          {/* พื้นบ้าน */}
          <Ground />

          {/* Trees */}
          <Tree position={[-2, 0, 21]} />
          <Tree position={[-7, 0, 23]} />
          <BigTree position={[-10, 0, 18]} />

          <Tree position={[21, 0, -2]} />
          <Tree position={[23, 0, -7]} />
          <BigTree position={[18, 0, -10]} />

          <Rock position={[3, 0, 20]} scale={1.2} />
          <Rock position={[2, 0, 22]} scale={0.8} />
          <Rock position={[5, 0, 21]} scale={1} />

          <Rock position={[20, 0, 3]} scale={1.2} />
          <Rock position={[22, 0, 2]} scale={0.8} />
          <Rock position={[21, 0, 5]} scale={1} />

          {/* <AnimatedModel url="/model.glb" /> */}
          <Suspense fallback={<Loader />}>
            <ModelWithScreen
              url="/home-3.glb"
              text={` Welcome to \nMy Homepage \n :)`}
            />
          </Suspense>
          {/* ให้หมุนดูได้ */}
          <OrbitControls
            minPolarAngle={Math.PI / 4} // มุมต่ำสุดที่หมุนได้ (เช่น 45 องศา)
            maxPolarAngle={Math.PI / 2.5} // มุมสูงสุดที่หมุนได้
            minDistance={10}
            maxDistance={100}
            enablePan={false}
          />
        </Canvas>
      </div>
    </>
  );
}

export default ThreeDHome;
