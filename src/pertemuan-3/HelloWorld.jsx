
export default function HelloWorld() {
  const propsUsecard = {
    nama: "Son Goku",
    nim: "20202020",
    tanggal: "2002/08/08",
  };
  return (
    <div>
    <img src="img/alam.png" width="100%"/>
      <h1>Hello World</h1>
      <p>Selamat Belajar ReactJs</p>
      <GretingBinjai />
      <QuoteText />
      <UserCard nama="Dayat" nim="2055301055" tanggal="2002/12/14" />
      <UserCard {...propsUsecard}/>
    </div>
  );
}

function GretingBinjai() {
  return <small>Salam Dari binjai</small>;
}

function QuoteText() {
  const text = "Mulutmu Harimaumu";
  const text2 = "Aku ingin jadi macan";
  return (
    <div>
      <hr />
      <p>{text.toLowerCase()}</p>
      <p>{text2.toUpperCase()}</p>
    </div>
  );
}

function UserCard(props) {
  return (
    <div>
      <hr />
      <h3>Nama: {props.nama}</h3>
      <p>NIM: {props.nim}</p>
      <p>Tanggal: {props.tanggal}</p>
    </div>
  );
}
