function grayscaleFilter(imageData) {
    var pixels = imageData.data;
    var numPixels = pixels.length;

    for (var i = 0; i < numPixels; i += 4) {
        var red = pixels[i];
        var green = pixels[i + 1];
        var blue = pixels[i + 2];
        var alpha = pixels[i + 3];

        var gray = (red + green + blue) / 3;

        pixels[i] = gray; // Red
        pixels[i + 1] = gray; // Green
        pixels[i + 2] = gray; // Blue
        // Don't change the alpha value
    }

    return imageData;
}

function testGrayscaleFilterJS() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // Laden Sie ein großes Bild (z.B. 4096 x 4096 Pixel)
    var img = new Image();
    img.src = "wallpaper.jpg";
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Wenden Sie den Graustufenfilter auf das Bild an und messen Sie die Zeit
        var start = performance.now();
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        grayscaleFilter(imageData);
        ctx.putImageData(imageData, 0, 0);
        var end = performance.now();

        console.log("Time taken: " + (end - start) + " milliseconds");
    };
}

   <script type="module">
            import init, { grayscale_filter } from "./rust/pkg/rust.js";

            await init();

            async function testGrayscaleFilter() {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Laden Sie ein großes Bild (z.B. 4096 x 4096 Pixel)
                const img = new Image();
                img.src = "wallpaper.jpg";
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Wenden Sie den Graustufenfilter auf das Bild an und messen Sie die Zeit
                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const pixels = imageData.data;
                const width = imageData.width;
                const height = imageData.height;
                const start = performance.now();
                grayscale_filter(pixels, width, height);
                ctx.putImageData(imageData, 0, 0);
                const end = performance.now();

                console.log("Time taken: " + (end - start) + " milliseconds");
            }

            testGrayscaleFilter();
