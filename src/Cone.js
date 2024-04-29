class Cone {
    constructor(radius, height, segments) {
        if (radius <= 0 || height <= 0 || segments < 3) {
            throw new Error('Invalid parameters for Cone');
        }
        this.type = 'cone';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.radius = radius;
        this.height = height;
        this.segments = segments;
    }

    // Method to create base vertices
    createBaseVertices() {
        const baseVertices = [];
        for (let i = 0; i < this.segments; i++) {
            const theta = (i / this.segments) * 2 * Math.PI;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);
            baseVertices.push(x, y, 0);
        }
        return baseVertices;
    }

    // Method to draw a triangle
    drawTriangle(vertices) {
        drawTriangle3D(vertices);
    }

    render() {
        var rgba = this.color;

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        const baseVertices = this.createBaseVertices();
        const apexVertex = [0, 0, this.height];

        // Draw triangles connecting apex to base vertices
        for (let i = 0; i < this.segments; i++) {
            const nextIndex = (i + 1) % this.segments;
            const baseVertex1 = baseVertices.slice(i * 3, i * 3 + 3);
            const baseVertex2 = baseVertices.slice(nextIndex * 3, nextIndex * 3 + 3);
            this.drawTriangle(apexVertex.concat(baseVertex1, baseVertex2));
        }

        // Draw base triangles
        for (let i = 0; i < this.segments; i++) {
            const nextIndex = (i + 1) % this.segments;
            const baseVertex1 = baseVertices.slice(i * 3, i * 3 + 3);
            const baseVertex2 = baseVertices.slice(nextIndex * 3, nextIndex * 3 + 3);
            this.drawTriangle([0, 0, 0].concat(baseVertex1, baseVertex2));
        }
    }
}