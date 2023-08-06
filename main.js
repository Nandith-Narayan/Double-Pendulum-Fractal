const gpu = new GPUX();

const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 1000;

const computeAngularAcceleration = gpu.createKernel(function (thetaArray1, thetaArray2, thetaPrimeArray1, thetaPrimeArray2) {
    const g = 9.8;
    const m1 = 1.0;
    const m2 = 1.0;
    const L1 = 1.0;
    const L2 = 1.0;
    
    let theta1 = thetaArray1[this.thread.x][this.thread.y];
    let theta2 = thetaArray2[this.thread.x][this.thread.y];
    let thetaPrime1 = thetaPrimeArray1[this.thread.x][this.thread.y];
    let thetaPrime2 = thetaPrimeArray2[this.thread.x][this.thread.y];
    
    let n1 = ((-g)*((2*m1)+m2)*Math.sin(theta1)) - (m2*g*Math.sin(theta1-(2*theta2))) - ((2*Math.sin(theta1-theta2)*m2)*((thetaPrime2*thetaPrime2*L2)+(thetaPrime1*thetaPrime1*L1*Math.cos(theta1-theta2))));
    let n2 = 2*Math.sin(theta1-theta2)*((thetaPrime1*thetaPrime1*L1*(m1+m2))+(g*(m1+m2)*Math.cos(theta1))+(thetaPrime2*thetaPrime2*L2*m2*Math.cos(theta1-theta2)));
    let d1 = L1*((2*m1)+(m2)-(m2*Math.cos(2*(theta1-theta2))));
    let d2 = L2*((2*m1)+(m2)-(m2*Math.cos(2*(theta1-theta2))));
    
    return [n1/d1, n2/d2];
    
}).setOutput([SCREEN_WIDTH, SCREEN_HEIGHT]);

