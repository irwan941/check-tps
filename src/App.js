import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import background from './bg.jpg'

class App extends Component {

  state = {
    nama: "",
    nik: "",
    biodata: {
      jenis_kelamin: "",
      nama: "",
      namaKabKota: "",
      namaKecamatan: "",
      namaKelurahan: "",
      namaPropinsi: "",
      nik: "",
      tempat_lahir: "",
      tps: ""

    },
    status: false,
    submit: false,
    loading: false

  }

  handleNama = (event) => {
    console.log(event.target.value)
    this.setState({ nama: event.target.value })
  }
  handleNik = (event) => {
    console.log(event.target.value)
    this.setState({ nik: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    fetch("http://159.65.0.155:4000/ceknik", {
      "headers": {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      "body": `nik=${this.state.nik}&nama=${this.state.nama}`,
      "method": "POST",
    }).then(res => res.json()).then(data => {
      console.log(data)

      if (data.message === "success") {
        console.log("sukses")
        console.log(data.data);
        this.setState({
          biodata: {
            jenis_kelamin: data.data.jenis_kelamin,
            nama: data.data.nama,
            namaKabKota: data.data.namaKabKota,
            namaKecamatan: data.data.namaKecamatan,
            namaKelurahan: data.data.namaKelurahan,
            namaPropinsi: data.data.namaPropinsi,
            nik: data.data.nik,
            tempat_lahir: data.data.tempat_lahir,
            tps: data.data.tps
          },
          status: true,
          submit: true,
          loading: false
        })

      }
      else {
        console.log("false")
        this.setState({ submit: true, loading: false })
      }
    }

    ).catch(data => console.log(data));
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Logo</a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">Javascript</a></li>
              <li><a href="mobile.html">Mobile</a></li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">Javascript</a></li>
          <li><a href="mobile.html">Mobile</a></li>
        </ul>
        <div className="container">
          <div className="row">
            <div className="col s12 ">
              <div className="App">
                <div className="row">
                  <form onSubmit={this.handleSubmit} className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input onChange={this.handleNama} placeholder="Nama" id="first_name" type="text" className="validate" />
                        <label htmlFor="first_name">Nama</label>
                      </div>
                      <div className="input-field col s12">
                        <input onChange={this.handleNik} placeholder="12345678910" id="first_name" type="number" className="validate" autocomplete="off" />
                        <label htmlFor="first_name">NIK</label>
                      </div>
                      <div id="div" class="row center">
                        {this.state.nama === "" && this.state.nik === "" ? <button disabled class="btn waves-effect waves-light" type="submit" name="action">Submit
                           <i class="material-icons right">send</i>
                        </button> : <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                           <i class="material-icons right">send</i>
                          </button>}
                      </div>
                    </div>
                  </form>
                </div>
                {this.state.status && this.state.loading === false && <div class="card-panel teal">
                  <span class="white-text">
                    Nama:  {this.state.biodata.nama}<br />
                    Jenis_kelamin: {this.state.biodata.jenis_kelamin}<br />
                    TPS: {this.state.biodata.tps}
                    Kabupaten: {this.state.biodata.namaKabKota}<br />
                    Kecamatan: {this.state.biodata.namaKecamatan}<br />
                    Kelurahan: {this.state.biodata.namaKelurahan}<br />
                    Propinsi: {this.state.biodata.namaPropinsi}<br />
                    NIK: {this.state.biodata.nik}<br />
                    Tempat Lahir: {this.state.biodata.tempat_lahir}<br />

                  </span>
                </div>}
                {this.state.status === false && this.state.submit && this.state.loading === false && <div class="card-panel red darken-1">
                  <span className="white-text">
                    Data tidak di temukan</span>
                </div>}


                {this.state.loading && <ReactLoading className="loading" type={"spinningBubbles"} color={"#009688"} height={100} width={100} />}
              </div>



            </div>
          </div>

        </div>


      </div >
    );
  }
}

export default App;
