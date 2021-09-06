<template>
  <div>
    <input
      type="file"
      name="fjdfj"
      id=""
      @change="getImage"
    >
    <br />
    <img :src="imageURL" alt="">
  </div>
</template>

<script>
import { pdfToImage } from './pdfToImage.js'
export default {
  name: 'PdfToImage',
  data () {
    return {
      imageURL: ''
    }
  },
  methods: {
    getImage (e) {
      debugger
      const file = e.target.files[0]
      pdfToImage(file).then((res) => {
        console.log('res =>', res)
        this.imageURL = res
      })
      // console.time()
      // var pdfjsLib = window['pdfjs-dist/build/pdf']
      // pdfjsLib.GlobalWorkerOptions.workerSrc =
      //   '//mozilla.github.io/pdf.js/build/pdf.worker.js'
      // const fileReader = new FileReader()

      // fileReader.onload = function () {
      //   var typedarray = new Uint8Array(this.result)

      //   const loadingTask = pdfjsLib.getDocument(typedarray)
      //   loadingTask.promise
      //     .then((pdf) => {
      //       // The document is loaded here...
      //       var pageNumber = 1
      //       pdf.getPage(pageNumber).then(function (page) {
      //         console.log('Page loaded')
      //         var scale = 1.5
      //         var viewport = page.getViewport({ scale: scale })

      //         // Prepare canvas using PDF page dimensions
      //         const canvas = document.createElement('canvas')
      //         const context = canvas.getContext('2d')
      //         canvas.height = viewport.height
      //         canvas.width = viewport.width
      //         // Render PDF page into canvas context
      //         var renderContext = {
      //           canvasContext: context,
      //           viewport,
      //         }
      //         var renderTask = page.render(renderContext)
      //         renderTask.promise.then(function () {
      //           console.log('Page rendered')
      //           const base64 = canvas.toDataURL('image/png')
      //           console.log('canvas 对应的 base64 =>', base64)
      //           console.timeEnd()
      //         })
      //       })
      //     })
      //     .catch((reason) => {
      //       console.error(reason)
      //     })
      // }
      // fileReader.readAsArrayBuffer(file)
    },
  }
}
</script>
