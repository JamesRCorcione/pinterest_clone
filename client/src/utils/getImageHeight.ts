export function getImageDimensions(file:any) {
    return new Promise (function (resolved, rejected) {
      var i = new Image()
      i.onload = function(){
        resolved({w: i.width, h: i.height})
      };
      i.src = file
    })
}

//const img = new Image();
//
//img.src = 'https://via.placeholder.com/350x150';
//
//img.onload = function() {
//  const imgWidth = img.naturalWidth;
//  const imgHeight = img.naturalHeight;
//
//};