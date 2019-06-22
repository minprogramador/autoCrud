
/*app json to simple dasboard.*/

let tableJson = [
  {
    "id": 1,
    "cookie": "JSESSIONID=80B12EE18E6B3039C1DE2B4C40A75B80;",
    "img": "....",
    "key": "61790958238",
    "solucao": "4mkwy",
    "start": "2019-6-18 3:06:28 AM",
    "count": 0,
    "status": 1
  },
  {
    "id": 2,
    "cookie": "JSESSIONID=B2ABB7319F71F063836550001E463F6F;",
    "img": "....",
    "key": "61790958239",
    "solucao": "yx8np",
    "start": "2019-6-18 3:06:32 AM",
    "count": 0,
    "status": 1
  }
];


let p = {
  "Sistema": {
    "Validar Caps": "on",
    "Resolve Caps": "off",
    "Coletar Caps": "off",
    "docs in cache": 10,
    "Ultima consulta": "2019-06-18 11:02:14 PM",
    "Total de acertos": 58,
    "Total de erros": 15,
    "proxy": "http://arainha.hopto.org:5510",
    "status": true
  },
  "captchas": {
    "Total on": 2,
    "Total off": 0,
    "Total pendente": 0
  }
};

//============================================================================//

let appNome = 'ApiControl';

var pglogin = app.getHtml('login.html');
app.addHtml('#app', pglogin);

function mapear() {
  var url = encodeURI(document.querySelector('#url').value);
  let urlok = 'http://localhost:3000/proxy.php?url=' + url;


  get(urlok).then(function(text) {
  document.getElementById('app').innerHTML = "";
  // app.addHtml('#app', pglogin);

    var dados = JSON.parse(text);
    var tablemount = app.createTable(dados);

    if(typeof tablemount === 'object') {
        var table   = app.getHtml('table.html');
        app.addHtml('#app', '<br><br>');
        app.addHtml('#app', table);
        app.addObjHtml('#table', tablemount);
    }else{

        var frmok = app.buildView(text);
        app.addHtml('#app', '<br><br>');      

        app.addHtml('#app', frmok);
        app.addHtml('#app', '<br><br>');    
        app.addHtml('#msgbody', `Origem: <span style="font-size: 12px;">${url}</span>`);

    }

  }, function(error) {

    console.log("Failed to fetch data.txt: " + error);

  });

}














// 
//============================================================================//

// var table   = app.getHtml('table.html');
// var menu    = app.getHtml('menu.html');
//   menu      = app.setVars(menu, {item: 'novo titulo ze mane'});

// var titulo  = app.getHtml('tituloHeader.html');
//   titulo    = app.setVars(titulo, {titulo: 'novo titulo ze mane'});

// let msg     = app.getHtml('message.html');
//     msg     = app.setVars(msg, {msg: 'fim do template.'});


// //app init.

// app.appNome(appNome);
// app.addHtml('#app', '<br><br>');
// app.addHtml('#app', menu);
// app.addHtml('#app', titulo);
// app.addHtml('#app', '<br>');
// app.addHtml('#app', table);
// app.addHtml('#app', '<br><br>');
// app.addHtml('#app', msg);

// //============================================================================//

// let objs1 = p['captchas'];
// let titulo1 = 'Captchas';

// let formdiv1 = app.addForm(objs1, titulo1);

// app.addHtml('#app', formdiv1);
// app.addHtml('#app', '<br><br>');

// // // adiciona table.
// let tabb = app.createTable(tableJson);
// app.addObjHtml('#table', tabb);


//============================================================================//

//adiciona form.

// form.add('novo.php', 'novoform');
// form.addTitulo('Teste final');
// form.addInput('url', 'url', 'Digite a url');
// form.addBnt('Acessar');
// app.addObjHtml('#app', form.run());




//let objs1 = p['captchas'];
//let titulo1 = 'Captchas';


//============================================================================//

// // add form 1
// let objs1 = p['captchas'];
// let titulo1 = 'Captchas';
// form.add('captcha.php', 'captcha');
// form.addTitulo(titulo1);
// for (let value2 in objs1) { form.addInput(value2, value2, objs1[value2]); }
// form.addBnt('Atualizar '+titulo1);
// boxform = app.setVars(boxform, {form: form.getHtml()});
// app.addHtml('#app', boxform);
// app.addHtml('#app', '<br><br>');

//============================================================================//


// // add form2
// var boxform2 = app.getHtml('boxform.html');
// let objs2 = p['Sistema'];
// let titulo2 = 'Sistema';
// form.add('sistema.php', 'sistema');
// form.addTitulo(titulo2);
// for (let value3 in objs2) { form.addInput(value3, value3, objs2[value3]); }
// form.addBnt('Atualizar '+titulo2);
// boxform2 = app.setVars(boxform2, {form: form.getHtml()});
// app.addHtml('#app', boxform2);
// app.addHtml('#app', '<br><br>');

