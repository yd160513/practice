/**
 * 将图片压缩并返回 base64
 * @param {blob, string, objectURL} file 
 * @param {number} width // 最大宽
 * @param {number} height // 最大高
 * @param {number} quality // 图片压缩质量，取值 0 - 1
 */
export function compress(file, width, height, quality) {
  const canvas = document.createElement('canvas')
  const blob = typeof file === 'string' ? file : URL.createObjectURL(file);
  const isBase64 = /^data:/.test(file)
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // 获取压缩后的大小
      const sizeContent = getSize(img, width, height)
      const ctx = canvas.getContext('2d')
      canvas.width = sizeContent.width
      canvas.height = sizeContent.height
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, sizeContent.width, sizeContent.height);
      const base64 = canvas.toDataURL('image/jpeg', quality)
      resolve({
        base64,
        origin: file
      })
      URL.revokeObjectURL(blob);
    }
    img.src = blob
  })
}

// 如果图片本身宽高小于 maxHeight 或 maxWidth 则将原尺寸返回
function getSize(img, maxWidth, maxHeight) {
  const width = maxWidth
  const height = maxHeight
  // 原始宽高
  const originalWidth = img.width
  const originalHeight = img.height
  const ret = {
    width: originalWidth,
    height: originalHeight
  }

  // 如果原图小于设定，采用原图
  if (ret.width < width || ret.height < height) {
    return ret;
  }

  var scale = width / height;

  if (width && height) {
    if (scale >= width / height) {
      if (ret.width > width) {
        ret.width = width;
        ret.height = Math.ceil(width / scale);
      }
    } else {
      if (ret.height > height) {
        ret.height = height;
        ret.width = Math.ceil(height * scale);
      }
    }
  }
  else if (width) {
    if (width < ret.width) {
      ret.width = width;
      ret.height = Math.ceil(width / scale);
    }
  }
  else if (height) {
    if (height < ret.height) {
      ret.width = Math.ceil(height * scale);
      ret.height = height;
    }
  }
  return ret
}