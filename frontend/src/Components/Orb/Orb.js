import React from 'react'
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowsSize';


export default function Orb() {

    const {width,height} = useWindowSize();

    console.log(width,height)

    const moveOrb = keyframes`
        0%{
            transform:tanslate(0,0);
        }
        50%{
            transform:translate(${width/1.2}px,${height/2}px);
        }
        100%{
            transform:translate(0,0);
        }
    `;

    const OrbStyled = styled.div`
        width:70vh;
        height:70vh;
        position:absolute;
        boder-radius:50%;
        margin-left:-37vh;
        margin-top:-37vh;
        background:linear-gradient(18deg,#F56692 0%,#F2994A 100%);
        filter:blur(400px);
        animation:${moveOrb} 15s alternate linear infinite ;
    `;

  return (
    <OrbStyled>
        Orb
    </OrbStyled>
  )
}
