import {Suspense, useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Preload, useGLTF} from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = (isMobile) => {
  const computer = useGLTF('/mario/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={1.95} groundColor="black"/>
      <pointLight intensity={50}/>
      <primitive object={computer.scene} scale={isMobile ? 0.9 : 0.85} position={isMobile ? [9, -10, -5.2] : [2, -4.25, -1.5]} rotation={[-0.01, -0.1, -0.1]}/>
      <spotLight
        position={[9, 10, 10]}
        angle={0.12}
        penumbra={1}
        intensity={5}
        castShadow
        shadow-mapSize={1024}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
    }, []);
  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{position: [30, 30, 40], fov: 30}}
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas;