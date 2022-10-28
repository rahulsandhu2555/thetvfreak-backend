const axios = require('axios')
const fs = require("fs");
const path = require("path");
const fu =  async  () => {
        const res = await axios('http://localhost:3002/blog/list-of-posts');
        let count = 0;
        let failCount = 0;
        let arr =[];
        for(let i =0; i< res.data.length; i++){
                // { post_name: '10-best-hollywood-emotional-and-sad-movies' },
                const post = await axios(`http://localhost:3002/blog/${res.data[i].post_name}`)
                let postContent = post.data.post_content;
                const pattern = /\<img.*\/\>/
                // console.log(str.match(pattern))
                while (true){
                        const result = postContent.match(pattern)
                        if (!result) break;
                        const patternImg = /src=".*" alt/
                        let imgAddress =result[0].match(patternImg)[0].split('src="')[1].split('" alt')[0];
                        imgAddress = imgAddress.replace('https://www.thetvfreak.com/wp-content', '.')
                        const destAddress = imgAddress.replace('uploads', 'uploads2')
                        let destAddressArr =destAddress.split('/')
                        let dirDestAdd ='./'+destAddressArr[1]+'/'+destAddressArr[2]
                        if(!fs.existsSync(dirDestAdd)){
                                fs.mkdir(dirDestAdd, ()=>{})
                                fs.mkdir(dirDestAdd+'/'+destAddressArr[3], ()=>{})

                        }
                        // arr.push(destAddress[destAddress.length-1])
                        // destAddress ='uploads2/'+destAddress[destAddress.length-1]
                        console.log(imgAddress)
                        console.log(destAddress)
                        // await fs.copyFileSync(path.resolve(__dirname, imgAddress),path.resolve(__dirname, destAddress),fs.constants.COPYFILE_EXCL,()=>{})
                        // await copy(path.resolve(__dirname, imgAddress), path.resolve(__dirname, destAddress))
                        await fs.cp( path.resolve(__dirname, imgAddress), path.resolve(__dirname, destAddress), ()=>{failCount++} )
                        postContent =  postContent.replace(result[0], result[0].replace('img', 'IMG'))
                        count++
                }
        }
        console.log(arr.length)
        console.log(count)
        console.log(failCount)

}
function copy(oldPath, newPath) {
        return new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(oldPath);
                const writeStream = fs.createWriteStream(newPath);

                readStream.on('error', err => reject(err));
                writeStream.on('error', err => reject(err));

                writeStream.on('close', function() {
                        resolve();
                });

                readStream.pipe(writeStream);
        })}
fu();
