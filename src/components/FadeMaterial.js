import { extend } from "react-three-fiber"
import { shaderMaterial } from "drei"

const FadeMaterial = shaderMaterial(
  {
    effectFactor: 5,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
  `varying vec2 vUv;
  uniform sampler2D tex;
  uniform sampler2D tex2;
  uniform sampler2D disp;
  uniform float _rot;
  uniform float dispFactor;
  uniform float effectFactor;
  uniform float time;
  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x, uv.y + dispFactor );
    vec2 distortedPosition2 = vec2(uv.y, uv.x - (1.0 - dispFactor) );
    vec4 _texture = texture2D(tex, distortedPosition);
    vec4 _texture2 = texture2D(tex2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    gl_FragColor = finalTexture;
  }`
)

extend({ FadeMaterial })
