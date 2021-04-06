const download = require('image-downloader');

options = {
    url: "https://shopping-phinf.pstatic.net/main_2549406/25494065522.20210105094231.jpg?type=f140",
    dest: `\마스크`,
    extractFilename: false
}

download.image(options)
.then(({filename}) => {
    console.log('saved to ', filename)
})
.catch((err) => console.log(err))
