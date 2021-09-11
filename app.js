const {simpanPertanyaan}=require('./contacts')
const yargs=require('yargs')




yargs.command({
  command:"add",
  describe: "menambah data contact",
  builder : {
    nama:{
    describe: 'Nama Lengkap',
    demandOption: true,
    type: 'string'
      },
    email:{
      describe: ' Alamat Email',
      demandOption: false,
      type: 'string'
      },
    nohp:{
      describe: 'Nomor HP',
      demandOption: true,
      type: 'string'
      },

  },
  handler(argv){
    simpanPertanyaan(argv.nama,argv.email,argv.nohp)
  }


})



yargs.parse()








// handler(argv){
//   const contact={
//     nama:argv.nama2,
//     email:argv.email2,
//     nohp:argv.nohp2
//   }
//   console.log(contact) 
//  }







// yargs.command ('add','function add contact',()=>{},(argv)=>{
//   console.log(argv.nama)
// })






// const main=async()=>{
//   const nama=await contacts.tulispertanyaan('masukkan nama anda :')
//   const email=await contacts.tulispertanyaan('masukkan email anda :')
//   const hp=await contacts.tulispertanyaan('masukkan hp anda :')
  
//   contacts.simpanPertanyaan(nama,email,hp)

  


// console.log(process.argv[0])
//console.log(process.argv[2])
// console.log(yargs.argv)








        
// }

// main()




//yard :package yang digunakan untuk membuat comand line yg interactive berdasarkan argument yang kita berikan

