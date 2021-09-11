//menjalankan fungsi utama program

const chalk=require('chalk')
const fs = require('fs');
const validator=require('validator')


//1.Untuk mengecek sebuah file atau directory ada ga di filesystem kita,kalau ga ada maka auto create folder
const dirPath='./data'

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath) 
}


//2. membuat file contact .json 
const dataPath='./data/contacts.json'
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath,'[]','utf-8')
}

//3.template pertanyaan


//4.Bagaimana cara menyimpan contact
const simpanPertanyaan =(nama,email,hp)=>{
    const answer={nama,email,hp}
    const dataBuffer=fs.readFileSync('data/contacts.json')
        const dataJson=JSON.parse(dataBuffer)
        //check nama:pengecekan nama yang ada di file json dengan nama yg baru diinput
        const duplicate=dataJson.find((answer)=>answer.nama===nama)
        if (duplicate){
          console.log(chalk.red.inverse.bold('contach sudah terdaftar gunakan nama lain'))
          return false
        }
        //check email
        //email boleh tidak ada makanya dibuat pilihan email tidak ada
        if(email){
          if (!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('email anda tidak valid'))
            return false //return false diluar karena kalau email true maka artinya email teriisi maka dia langsung keluar dari function
          }
           
        }
       //pengecekan nohp
       if (!validator.isMobilePhone(hp ,'id-ID')){
        console.log(chalk.red.inverse.bold('nomor anda tidak valid'))
        return false //return false diluar karena kalau email true maka artinya email teriisi maka dia langsung keluar dari function
      }


        dataJson.push(answer)
        
        fs.writeFileSync('data/contacts.json',JSON.stringify(dataJson))      
        console.log(chalk.green.inverse.bold(`saya konfirmasi ulang bahwa nama anda adalah ${nama} dengan email ${email},terimakasih sudah mengisi survey kami `))
 

}


module.exports={simpanPertanyaan}