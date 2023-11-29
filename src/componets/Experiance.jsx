import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { Dragon } from "./Dragon";
import { Cactoro } from "./Cactoro";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

function Experiance() {

  const[active,setActive]=useState(null)
  const[hovered,setHovered]=useState(null)
  useCursor(hovered)
  const cameraRef=useRef()
  const scene=useThree((state)=>state.scene)

  useEffect(()=>{
    if(active){
      const targetposition=new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetposition)
      cameraRef.current.setLookAt(
        0,
        0,
        5,
        targetposition.x,
        targetposition.y,
        targetposition.z,
        true
      )
    }else{
      cameraRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
       
        true
      )

    }

  },[active])
 
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={cameraRef} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/6} />
      <MonsterStage texture={"textures/anime_art_style_lava_world.jpg"} name="Dragon" color={"#d17d13"} position-x={-2.5} rotation-y={Math.PI / 8 } 
      active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
      <Dragon scale={0.5} position-y={-1} hovered={hovered === "Dragon"} />
      </MonsterStage>
      <MonsterStage texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"} name="Fish King" color={"#38adfc"} active={active} 
      setActive={setActive} hovered={hovered} setHovered={setHovered}>
      <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"} />
      </MonsterStage>
      <MonsterStage texture={"textures/anime_art_style_cactus_forest.jpg"}  position-x={2.5} rotation-y={-Math.PI / 8 } name="Cactoro" color={"#739d3c"} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
      <Cactoro scale={0.45} position-y={-1} hovered={hovered === "Cactoro"} />
      </MonsterStage>
    </>
  );
}

export default Experiance;




const MonsterStage=({children,texture,name,active,setActive,hovered,setHovered,color,...props})=>{
  const map = useTexture(texture);
  const portalRef=useRef()
  
  useFrame((_state,delta)=>{
    const worldOpen =active == name;
    easing.damp(portalRef.current,"blend",worldOpen ? 1 : 0,0.2,delta)
   
    
  })
  return(
    <group {...props}>
      <Text
       font="fonts/Caprasimo-Regular.ttf" 
       fontSize={0.3} 
       position={[0,-1.3,0.05]} 
       anchorY={"bottom"}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false}/>
        </Text>
      <RoundedBox name={name} args={[2,3,0.1]}
       onDoubleClick={()=>setActive(active === name ? null :name)}
       onPointerEnter={()=>setHovered(name)}
       onPointerLeave={()=>setHovered(null)}
       >
        <MeshPortalMaterial
         side={THREE.DoubleSide}
         ref={portalRef}
          >
        <ambientLight intensity={1} />
      <Environment preset="sunset" />
      {children}
          <mesh>  
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial> 
      </RoundedBox>

    </group>
  )
}
