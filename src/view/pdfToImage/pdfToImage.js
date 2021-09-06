const initPdfjsLib = () => {
  const pdfjsLib = window['pdfjs-dist/build/pdf']
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    '//mozilla.github.io/pdf.js/build/pdf.worker.js'
  return pdfjsLib
}

export const pdfToImage = async (file) => {
  console.time()
  // 初始化
  const pdfjsLib = initPdfjsLib()
  // 读取文件
  const fileReader = new FileReader()
  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      const typedarray = new Uint8Array(fileReader.result)
      const loadingTask = pdfjsLib.getDocument(typedarray)
      loadingTask.promise.then((pdf) => {
        const pageNumber = 1
        pdf.getPage(pageNumber).then(function (page) {
          console.log('Page loaded')
          const scale = 1
          const viewport = page.getViewport({ scale: scale })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
          const renderContext = {
            canvasContext: context,
            viewport
          }
          const renderTask = page.render(renderContext)
          renderTask.promise.then(function () {
            console.log('Page rendered')
            const base64 = canvas.toDataURL('image/png')
            console.log('canvas 对应的 base64 =>', base64)
            console.timeEnd()
            resolve(base64)
          })
        })
      })
        .catch(reason => {
          console.error(reason)
          reject(reason)
        })
    }
    fileReader.readAsArrayBuffer(file)
  })
}
