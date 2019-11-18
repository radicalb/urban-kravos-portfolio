import React, { Component } from 'react';

class Aboutme extends Component {
  state = {};
  render() {
    return (
      <section className="page-section portfolio" id="aboutme">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            O meni
          </h2>

          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <div className="row">
            <div className="col-lg-10 mx-auto">
              <p className="lead">
                Pozdravljeni, sem Urban Kravos, dipl. inž. računalništva in
                informatike. V prostem času se ukvarjam s programiranjem. Dobro
                poznam programske jezike C#, Java, JavaScript, HTML5 in CSS3.
                Imam pa tudi omejeno znanje Phytona in VB. Poznane so mi tako
                relacijske kot nerelacijske podatkovne baze. Včasih sem se
                veliko ukvarjal tudi z Delphijem.
              </p>
              <p className="lead">
                V zadnjem času sem pridobil nekaj znanja iz ReactJS freameworka
                in Bootstrapa. V službi sem trenutno ukvarjam z avtomatizacijo
                izdelave Powerpoint poročil iz Sharepoint seznamov preko Excela
                (VBA).
              </p>

              <p className="lead">
                Spodaj si lahko ogledate nekaj mojih projektov. Želim vam
                prijetno brskanje.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Aboutme;
