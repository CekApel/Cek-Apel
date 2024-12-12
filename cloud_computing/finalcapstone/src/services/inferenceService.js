const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/inputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([256,256])
            .expandDims()
            .toFloat()
 
        const classes = ["appleScab", "blackRot", "cedarAppleRust", "healthy"];
        
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
 
        let explanation, suggestion, medicine;
 
        if(label === 'appleScab') {
            explanation = "Penyakit yang disebabkan oleh jamur Venturia inaequalis. Gejalanya berupa bercak hijau zaitun atau hitam pada daun, buah, dan batang. Buah yang terkena bisa retak dan menjadi tidak layak konsumsi.";
            suggestion = ["Gunakan varietas apel yang tahan terhadap Apple Scab", "Potong dan buang bagian tanaman yang terinfeksi.", "Semprotkan fungisida berbahan aktif seperti mankozeb atau sulfur pada awal musim tanam.", "Pastikan sirkulasi udara yang baik dengan memangkas pohon secara teratur."];
            medicine = ["Mancozeb","Captan","Difenoconazole","Thiophanate-methyl","Chlorothalonil"];
        }
        
        if(label === 'blackRot') {
            explanation = "Penyakit ini disebabkan oleh jamur Botryosphaeria obtusa. Gejalanya berupa lesi cokelat melingkar pada daun, bercak ungu tua pada buah, dan kanker pada batang.";
            suggestion = ["Potong dan buang bagian pohon yang terinfeksi, termasuk buah yang jatuh.","Gunakan fungisida berbasis tembaga atau mankozeb pada tahap awal infeksi.","Pastikan kebersihan kebun dengan menghilangkan dedaunan yang gugur dan ranting mati."];
            medicine = ["Mancozeb", "Captan", "Difenoconazole", "Thiophanate-methyl", "Chlorothalonil"];
        }
        
        if(label === 'cedarAppleRust') {
            explanation = "Penyakit ini disebabkan oleh jamur Gymnosporangium juniperi-virginianae. Membutuhkan juniper (cedar) dan apel sebagai inangnya. Gejala di apel berupa bercak kuning oranye dengan bintik hitam di bagian bawah daun.";
            suggestion = ["Hindari menanam apel di dekat juniper untuk mengurangi penyebaran.", "Gunakan varietas apel yang tahan terhadap penyakit ini.", "Semprotkan fungisida berbahan aktif seperti mankozeb atau propikonazol sebelum gejala muncul, terutama selama musim semi."];
            medicine = ["Mancozeb","Trifloxystrobin"];
        }
        
        if(label === 'healthy') {
            explanation = "Tanaman Anda dalam kondisi sehat. Pertahankan kondisi ini dengan memberikan perawatan yang baik seperti penyiraman yang cukup, pemupukan teratur, dan menjaga kebersihan kebun.";
            suggestion = "Lanjutkan perawatan rutin untuk menjaga tanaman tetap sehat dan produktif.";
            medicine = "air & pupuk secukupnya";
        }
 
        return { confidenceScore, label, explanation, suggestion, medicine };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;