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





//membuat function membaca contact.json,dibuat abstraksi kedalam function karena digunakan berulang ulang

const loadData = ()=>{

  const dataBuffer=fs.readFileSync('data/contacts.json')
  const dataJson=JSON.parse(dataBuffer)
  return dataJson

}






//4.Bagaimana cara menyimpan contact
const simpanPertanyaan =(nama,email,hp2)=>{
    const answer={nama,email,hp2}


      //2 step untuk mengambil data dari contact.json
      // const dataBuffer=fs.readFileSync('data/contacts.json')
      // const dataJson=JSON.parse(dataBuffer)
      const dataJson=loadData()



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
       if (!validator.isMobilePhone(hp2 ,'id-ID')){
        console.log(chalk.red.inverse.bold('nomor hp anda tidak valid'))
        return false //return false diluar karena kalau email true maka artinya email teriisi maka dia langsung keluar dari function
      }


        dataJson.push(answer)
        
        fs.writeFileSync('data/contacts.json',JSON.stringify(dataJson))      
        console.log(chalk.green.inverse.bold(`saya konfirmasi ulang bahwa nama anda adalah ${nama} dengan email ${email},terimakasih sudah mengisi survey kami `))
 

}



const listContact=()=>{
  console.log(chalk.blue.inverse.bold(`Daftar list Contact : `))
    const dataJson=loadData()
    //dataJson dalam bentuk object dan ingin ditelusuri dari data tersebut untuk menampilkan setiap nomor hp dan namnanya
    dataJson.forEach((m,i)=>{
      console.log(`${1+i}. ${m.nama}-${m.hp2}`)
    })


}

const detailContact=(nama)=>{

  const dataJson=loadData()
  const detailcontactnama=dataJson.find((answer)=>answer.nama.toLowerCase()===nama.toLowerCase())//yg kiri nama di data contact ,yg kanan nama dari argv
  if (!detailcontactnama){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan di list contact`))
    return false //false biar saat selesai console log berhenti dibaris ini artinya keluar dari fungsi
  }

  //detailcontact nama sudah otomatis datanya berupa object json karena dia mengupas data dari "dataJSON"
  console.log(chalk.white.inverse.bold(`Berikut detail dari kontak yang anda cari` ))
  console.log(chalk.white.inverse.bold(`Nama  : ${detailcontactnama.nama}` ))
  console.log(chalk.white.inverse.bold(`Nomor HP  : ${detailcontactnama.hp2}` )) 
  if(detailcontactnama.email){
    console.log(chalk.white.inverse.bold(`Email  : ${detailcontactnama.email}` ))//khusus email dibuat seperti ini karena demain option bernilai false,biar tidak ada data undefined
  } 

}

const removeContact=(nama)=>{
  const dataJson=loadData()
  const NewdataJson=dataJson.filter(
    (member)=>member.nama.toLowerCase()!==nama.toLowerCase()
    )//kalau find setelah data nemu dia berhenti sedangkan kalau filter akan terus mencari data selanjutnya
  //filter akan menghasilkan array baru maka harus disimpan kedalam variable baru


  if (dataJson.length===NewdataJson.length){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan di list contact`))
    return false
  }

  //kalau benar maka kita save array baru hasil filter kedalam file contacts.json
  fs.writeFileSync('data/contacts.json',JSON.stringify(NewdataJson)) 
  console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus dari list contact`))
  
}




// const listContact=()=>{
//   const dataJson=loadData()//data beruba object
//   dataJson.forEach((m,i)=>{
//     console.log(`${i+1}. ${m.nama}-${m.hp}`)
//   })

// }





module.exports={simpanPertanyaan,listContact,detailContact,removeContact}