'use client';

import { useEffect, useRef } from 'react';

const vertexShader = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform float uIntensity;
  uniform float uGlowAmount;
  uniform float uPillarWidth;
  uniform float uPillarHeight;
  uniform float uNoiseIntensity;
  uniform float uRotCos;
  uniform float uRotSin;
  varying vec2 vUv;

  void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
    vec3 ro = vec3(0.0, 0.0, -10.0);
    vec3 rd = normalize(vec3(uv, 1.0));
    vec3 col = vec3(0.0);
    float t = 0.1;

    for (int i = 0; i < 48; i++) {
      vec3 p = ro + rd * t;
      p.xz = vec2(uRotCos * p.x - uRotSin * p.z, uRotSin * p.x + uRotCos * p.z);
      vec3 q = p;
      q.y = p.y * uPillarHeight + uTime;
      float frequency = 1.0;
      float amplitude = 1.0;
      for (int j = 0; j < 2; j++) {
        q += cos(q.zxy * frequency - uTime * float(j) * 2.0) * amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      float d = length(cos(q.xz)) - 0.2;
      float bound = length(p.xz) - uPillarWidth;
      float k = 4.0;
      float h = max(k - abs(d - bound), 0.0);
      d = max(d, bound) + h * h * 0.0625 / k;
      d = abs(d) * 0.15 + 0.01;
      float gradient = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
      col += mix(uBottomColor, uTopColor, gradient) / d;
      t += d * 1.2;
      if (t > 50.0) break;
    }

    col = tanh(col * uGlowAmount / max(uPillarWidth / 3.0, 0.001));
    col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
    gl_FragColor = vec4(clamp(col * uIntensity, 0.0, 1.0), 1.0);
  }
`;

const hexToRgb = (hex) => {
  const value = hex.replace('#', '');
  const expanded = value.length === 3 ? value.replace(/./g, (char) => char + char) : value;
  return [0, 2, 4].map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16) / 255);
};

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export default function LightPillar({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1,
  rotationSpeed = 0.3,
  interactive = false,
  glowAmount = 0.005,
  pillarWidth = 3,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = 'screen',
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!canvas || !gl) return undefined;

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name) => gl.getUniformLocation(program, name);
    const uniforms = {
      time: uniform('uTime'), resolution: uniform('uResolution'), mouse: uniform('uMouse'),
      topColor: uniform('uTopColor'), bottomColor: uniform('uBottomColor'), intensity: uniform('uIntensity'),
      glowAmount: uniform('uGlowAmount'), pillarWidth: uniform('uPillarWidth'), pillarHeight: uniform('uPillarHeight'),
      noiseIntensity: uniform('uNoiseIntensity'), rotCos: uniform('uRotCos'), rotSin: uniform('uRotSin'),
    };
    gl.uniform3fv(uniforms.topColor, hexToRgb(topColor));
    gl.uniform3fv(uniforms.bottomColor, hexToRgb(bottomColor));
    gl.uniform1f(uniforms.intensity, intensity);
    gl.uniform1f(uniforms.glowAmount, glowAmount);
    gl.uniform1f(uniforms.pillarWidth, pillarWidth);
    gl.uniform1f(uniforms.pillarHeight, pillarHeight);
    gl.uniform1f(uniforms.noiseIntensity, noiseIntensity);

    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * ratio));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    };
    const move = (event) => {
      if (!interactive) return;
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const render = (now) => {
      const time = now * 0.001 * rotationSpeed;
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.mouse, mouseX, mouseY);
      gl.uniform1f(uniforms.rotCos, Math.cos(time * 0.3));
      gl.uniform1f(uniforms.rotSin, Math.sin(time * 0.3));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [topColor, bottomColor, intensity, rotationSpeed, interactive, glowAmount, pillarWidth, pillarHeight, noiseIntensity]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none fixed inset-0 ${className}`} style={{ mixBlendMode }} />;
}
