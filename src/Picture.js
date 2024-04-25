// used Github Copilot to help this part and reformat it as necessary especially when bugs were found
// used Github Copilot to recommend general structure as well
class Picture {
    constructor(){
        this.type = 'picture';
        this.d = 255;

        // Colors
        this.color = [90 / this.d, 34 / this.d, 139 / this.d , 1.0]; // Purple
        this.eyeColor = [237 / this.d , 233 / this.d, 157 / this.d, 1]; // Light Yellow
        this.mouthColor = [255 / this.d ,105 / this.d ,180 / this.d, 1]; // Pink

        // Positions
        this.earPosition = [0.18, 0.9, 0.27, 0.73, 0.09, 0.73]; // Set the position of the face
        this.earPositionL = reflectAboutYAxis(this.earPosition);
        this.faceHalf = [0.27,0.73, 0.27,0.18, -0.27,0.73 ];
        this.faceHalfL = [0.27,0.18, -0.27,0.18, -0.27,0.73];
        this.bodyPositionHalf = [0.27,0.18, 0.27,-0.55,-0.27,0.18 ];
        this.bodyPositionHalfL = [0.27,-0.55, -0.27,-0.55, -0.27,0.18];
        this.wingR = [0.27,0.09, 1,0.55, 1,0.09];
        this.wingL = reflectAboutYAxis(this.wingR);
        this.footR = [0.27, -0.55,0.09,-0.55, 0.18,-0.64];
        this.footL = reflectAboutYAxis(this.footR);
        this.eyeR = [0.09, 0.55, 0.18, 0.55, 0.09,0.45 ];
        this.eyeL = reflectAboutYAxis(this.eyeR);
        this.mouth = [0.09,0.36, 0,0.27,-0.09, 0.36 ];
        
        this.size = 10; // Set the size of the picture
    }

    drawFace() {
        // draw left ear
        gl.uniform4f(u_FragColor, ...this.color); // color
        drawTriangle(this.earPosition); // right ear
        drawTriangle(this.earPositionL); // left ear
        drawTriangle(this.faceHalf); // right half of face
        drawTriangle(this.faceHalfL); // left half of face

        gl.uniform4f(u_FragColor, ...this.eyeColor); // color

        drawTriangle(this.eyeR); // right eye
        drawTriangle(this.eyeL); // left eye

        gl.uniform4f(u_FragColor, ...this.mouthColor); // color
        drawTriangle(this.mouth); // mouth



    }

    drawBody() {
        gl.uniform4f(u_FragColor, ...this.color); // color
        drawTriangle(this.bodyPositionHalf); // right half of body
        drawTriangle(this.bodyPositionHalfL); // left half of body
        drawTriangle(this.wingR); // right wing
        drawTriangle(this.wingL); // left wing
        drawTriangle(this.footR); // right foot
        drawTriangle(this.footL); // left foot

    }

    render () {
        this.drawFace();
        this.drawBody();
    }
}

// asked ChatGPT to give me this function to reflect about Y Axis
function reflectAboutYAxis(coordinates) {
    return coordinates.map((val, index) => index % 2 === 0 ? -val : val);
}

function drawPicture() {
    let picture = new Picture();
    g_shapesList.push(picture);
    renderAllShapes();
}