// ARScene.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, TransformControls, useGLTF } from '@react-three/drei';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

extend({ OrbitControls, TransformControls });

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const ARScene = ({ modelUrl }) => {
  const { gl, scene, camera } = useThree();
  const transformRef = useRef();

  useEffect(() => {
    gl.xr.enabled = true;
    const arButton = ARButton.createButton(gl, { optionalFeatures: ['light-estimation'] });
    document.body.appendChild(arButton);

    const xrLight = new XREstimatedLight(gl);
    xrLight.addEventListener('estimationstart', () => {
      scene.add(xrLight);
      scene.environment = xrLight.environment || null;
    });

    xrLight.addEventListener('estimationend', () => {
      scene.environment = null;
      scene.remove(xrLight);
    });

    new RGBELoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    return () => {
      document.body.removeChild(arButton);
    };
  }, [gl, scene]);

  useFrame(() => {
    transformRef.current.update();
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <TransformControls ref={transformRef} mode="translate">
        <Model url={modelUrl} />
      </TransformControls>
    </>
  );
};

const ARCanvas = ({ modelUrl }) => {
  return (
    <Canvas>
      <ARScene modelUrl={modelUrl} />
    </Canvas>
  );
};

export default ARCanvas;
