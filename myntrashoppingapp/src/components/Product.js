import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { XREstimatedLight } from "three/examples/jsm/webxr/XREstimatedLight";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

function Product(props) {
  const [arActive, setArActive] = useState(false);

  useEffect(() => {
    if (arActive) {
      // Initialize AR/VR environment
      const container = document.createElement("div");
      document.body.appendChild(container);

      let camera, scene, renderer;
      let orbitControls, dragControls, transformControls;
      let controller;
      let defaultEnvironment;
      let model;
      let objects = [];

      init();

      function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          0.01,
          20
        );

        const defaultLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        defaultLight.position.set(0.5, 1, 0.25);
        scene.add(defaultLight);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);

        const xrLight = new XREstimatedLight(renderer);

        xrLight.addEventListener("estimationstart", () => {
          scene.add(xrLight);
          scene.remove(defaultLight);
          if (xrLight.environment) {
            scene.environment = xrLight.environment;
          }
        });

        xrLight.addEventListener("estimationend", () => {
          scene.add(defaultLight);
          scene.remove(xrLight);
          scene.environment = defaultEnvironment;
        });

        new RGBELoader()
          .setPath("textures/equirectangular/")
          .load("royal_esplanade_1k.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            defaultEnvironment = texture;
            scene.environment = defaultEnvironment;
          });

        const arButton = ARButton.createButton(renderer, {
          optionalFeatures: ["light-estimation"],
        });
        arButton.addEventListener("click", () => {
          setupARControls();
        });
        document.body.appendChild(arButton);

        const loader = new GLTFLoader();

        loader.load(
          "black_pants.glb", // Replace with the path to your model file
          function (gltf) {
            model = gltf.scene;
            model.position.set(0, 0, -2);
            scene.add(model);
            objects.push(model);

            // Initialize transform controls
            transformControls = new TransformControls(
              camera,
              renderer.domElement
            );
            transformControls.attach(model);
            scene.add(transformControls);

            transformControls.addEventListener(
              "dragging-changed",
              function (event) {
                orbitControls.enabled = !event.value;
              }
            );
          },
          undefined,
          function (error) {
            console.error("An error occurred while loading the model:", error);
          }
        );

        orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.target.set(0, 0, -2);
        orbitControls.update();

        dragControls = new DragControls(objects, camera, renderer.domElement);
        dragControls.addEventListener("dragstart", function (event) {
          orbitControls.enabled = false;
        });
        dragControls.addEventListener("dragend", function (event) {
          orbitControls.enabled = true;
        });

        function onSelect() {
          if (model) {
            model.position.set(0, 0, -2).applyMatrix4(controller.matrixWorld);
            model.quaternion.setFromRotationMatrix(controller.matrixWorld);
          }
        }

        controller = renderer.xr.getController(0);
        controller.addEventListener("select", onSelect);
        scene.add(controller);

        window.addEventListener("resize", onWindowResize);

        // Clean up when component unmounts
        return () => {
          container.removeChild(renderer.domElement);
          renderer.dispose();
          scene = null;
          camera = null;
          orbitControls = null;
          dragControls = null;
          transformControls = null;
          controller = null;
          defaultEnvironment = null;
          model = null;
          objects = [];
        };
      }

      function setupARControls() {
        // Ensure transform controls are enabled during AR
        renderer.xr.addEventListener("sessionstart", () => {
          transformControls.enabled = true;
          orbitControls.enabled = true;
          dragControls.enabled = true;
        });

        renderer.xr.addEventListener("sessionend", () => {
          transformControls.enabled = false;
          orbitControls.enabled = false;
          dragControls.enabled = false;
        });
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        renderer.render(scene, camera);
      }
    }
  }, [arActive]);

  const handleArView = () => {
    setArActive(true);
  };

  return (
    <div className="row product-row border-bottom py-3">
      <div className="col-12 col-md-2 mb-3 mb-md-0 text-center">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="img-fluid product-image"
        />
      </div>
      <div className="col-12 col-md-4 d-flex flex-column justify-content-center">
        <h2 className="mb-2">{props.product.name}</h2>
        <h3 className="text-muted mb-3">Price: ₹{props.product.price}</h3>
        <div className="btn-group" role="group" aria-label="Quantity">
          <button
            type="button"
            className="btn btn-danger btn-sm mr-2"
            onClick={() => {
              props.decrementQuantity(props.index);
            }}
          >
            -
          </button>
          <button type="button" className="btn btn-warning btn-sm mx-2">
            {props.product.quantity}
          </button>
          <button
            type="button"
            className="btn btn-success btn-sm ml-2"
            onClick={() => {
              props.incrementQuantity(props.index);
            }}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleArView}
        >
          AR View
        </button>
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            props.removeItem(props.index);
          }}
        >
          Remove
        </button>
      </div>
      <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
        <h4 className="m-0">Total: ₹{props.product.quantity * props.product.price}</h4>
      </div>
      {/* Optional: Display AR content based on `arActive` state */}
      {arActive && (
        <div className="col-12 mt-3">
          {/* Implement AR view content here */}
          <p>AR view content for {props.product.name}</p>
        </div>
      )
      }
    </div>
  );
}

export default Product;
