export class KalmanFilter {
  private cov = NaN;
  private x = NaN;

  constructor(private R: number = 1, private Q: number = 1, private A: number = 1, private B: number = 0, private C: number = 1) {
  }

  filter(z: number, u: number = 0): number {
    if (isNaN(this.x)) {
      this.x = (1 / this.C) * z;
      this.cov = (1 / this.C) * this.Q * (1 / this.C);
    } else {

      // Compute prediction
      const predX = this.predict(u);
      const predCov = this.uncertainty();

      // Kalman gain
      const K = predCov * this.C * (1 / ((this.C * predCov * this.C) + this.Q));

      // Correction
      this.x = predX + K * (z - (this.C * predX));
      this.cov = predCov - (K * this.C * predCov);
    }

    return this.x;
  }

  lastMeasurement() {
    return this.x;
  }

  predict(u: number = 0): number {
    return (this.A * this.x) + (this.B * u);
  }

  setMeasurementNoise(noise: number): void {
    this.Q = noise;
  }

  setProcessNoise(noise: number): void {
    this.R = noise;
  }

  uncertainty(): number {
    return ((this.A * this.cov) * this.A) + this.R;
  }
}
