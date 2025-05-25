// We use this class to pass to lil-gui
// so when it manipulates near or far
// near is never > far and far is never < near
// Also when lil-gui manipulates color we'll
// update both the fog and background colors.
class FogGUIHelper {
  fog: any;
  backgroundColor: any;

  constructor(fog: any, backgroundColor: any) {
    this.fog = fog;
    this.backgroundColor = backgroundColor;
  }
  get near() {
    return this.fog.near;
  }
  set near(v) {
    this.fog.near = v;
    this.fog.far = Math.max(this.fog.far, v);
  }
  get far() {
    return this.fog.far;
  }
  set far(v) {
    this.fog.far = v;
    this.fog.near = Math.min(this.fog.near, v);
  }
  get color() {
    return `#${this.fog.color.getHexString()}`;
  }
  set color(hexString) {
    this.fog.color.set(hexString);
    this.backgroundColor.set(hexString);
  }
}

export default FogGUIHelper;
