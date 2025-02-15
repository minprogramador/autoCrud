
const form = {
  retorno: null,
  f:      document.createElement("form"),
  input:  document.createElement("input"),
  button: document.createElement("button"),
  h2:     document.createElement("h2"),
  p:      document.createElement("p"),
  div:    document.createElement("div"),
  b:      document.createElement("button"),
  addTitulo: function(txt) {
    var tit = document.createElement("h2");
        tit.innerHTML = txt;
    this.f.appendChild(tit);
  },
  addSubTitulo: function(txt) {
    var sub = document.createElement("p");
        sub.innerHTML = txt;
    this.f.appendChild(sub);
  },
  add: function(action='', id='') {
    this.f = document.createElement("form");
    if(action === ''){
      action = 'javascript:void(0)';
    }
    this.f.setAttribute('method',"post");
    this.f.setAttribute('action', action);
    if(id !== ''){
      this.f.setAttribute('id', id);
      this.f.setAttribute('name', id);
    }
    return this.f;
  },
  addInput: function(name, titulo='', value='', type='text') {
    var field = document.createElement('div');
        field.setAttribute('class', 'field');

    var label = document.createElement('label');
        label.innerHTML = titulo;
        
    var adt = document.createElement("input");
    adt.setAttribute('type', type);
    adt.setAttribute('name',name);
    adt.setAttribute('value',value);

    field.appendChild(label);   
    field.appendChild(adt);

    this.f.appendChild(field);
    return this.field;
  },
  addBnt: function(value) {
    var bb = document.createElement("button");
    bb.setAttribute('type',"submit");
    bb.innerHTML = value;
    bb.setAttribute('class', 'ui button'); 
    this.f.appendChild(bb);
  },
  set: function(onde, conteudo) {
    document.getElementById(onde).appendChild(conteudo);
  },
  run: function() {
    this.f.setAttribute('class', 'ui form');
    return this.f;
  },
  getHtml: function(){
    this.f.setAttribute('class', 'ui form');
    return this.f.innerHTML;    
  }
};

//============================================================================//

const createTable=function(data){
  try{

    const table = document.createElement("table");
          table.setAttribute('class', 'ui very basic table');
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const header = document.createElement("tr");
    const keys=Object.keys(data[0])
    //console.log(keys)
    for(const key of keys) {
        const th=document.createElement("th");
        th.appendChild(document.createTextNode(key));
        header.appendChild(th);
    }
    thead.appendChild(header);
    table.appendChild(thead);
    const len=data.length
    for(const row of data) {
        const tr = document.createElement("tr");
        for(const key of keys){
            const td = document.createElement("td");
            const content=row[key] ||''
            td.appendChild(document.createTextNode(content));
            tr.appendChild(td);
            delete row[key]
        }
        for(const key in  row){
            const th=document.createElement("th");
            th.appendChild(document.createTextNode(key))
            keys.push(key)
            header.appendChild(th);
            const td = document.createElement("td");
            const content=row[key] ||''
            td.appendChild(document.createTextNode(content));
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    table.appendChild(tbody);

    return table;
  }catch(e){
    return false;
  }
}

//============================================================================//

const addForm = (objs1, titulo1) => {
  var boxform = getHtml('boxform.html');
  form.add(titulo1+'.php', titulo1);
  form.addTitulo(titulo1);

  for (let value2 in objs1) { form.addInput(value2, value2, objs1[value2]); }

  form.addBnt('Atualizar '+titulo1);

  boxform = replaceMe(boxform, {form: form.getHtml()});
  return boxform;
};

const getHtml = (arquivo) => {
  var link = document.querySelectorAll('link[rel="import"]');
  var err=0;
  for (var i = link.length - 1; i >= 0; i--) {
    if(link[i].href.includes(arquivo)) {
      var content = link[i].import.querySelector('.template');
      if(content.innerHTML.length > 0) {
        err--;
        return content.innerHTML;
      }else{
        console.log('nada encontrado no arquivo => %s', arquivo);
      }
    }else{
      err++;
    }
  }

  if(err > 1) {
    return false;
    console.log('Erro, import html nao existe, arquivo => %s', arquivo);
  }
};

//============================================================================//

const buildView = (json) => {

    if(typeof json === 'string') {
        json = JSON.parse(json);
    }
    var html = `<div class="ui text container">
        <div class="ui section divider"></div>
        <h4 class="ui top attached block header" id="msgbody">
        </h4>
        <div class="ui attached segment">
          <table class="ui very basic table">
      <tbody>`;
    var formok1 = '';

    for(let key in json) {
      html += `
        <div class="ui black table">
          <form class="ui form attached fluid segment frmtemplateok">
            <h2 class="ui dividing header">${key}</h2>`;

      if(typeof json[key] === 'object') {
        let zoneTitle = key;

        var formok = '';
        
        for (var key0 in json[key]) { 
          console.log('aqqqq');
          // formok += `
          //   <tr>
          //     <td class="left aligned">${key0}:   ${json[key][key0]}</td>
          //   </tr>`;
            formok += `<tr>
              <td class="left aligned"><strong>${key0}:</strong> <span style="margin-left:5px;">${json[key][key0]}</span></td>
            </tr>`;

    // formok1 += `
    //     <div class="field">
    //         <label>${key}</label>
    //         <input type="text" name="${key}" placeholder="${json[key]}">
    //     </div>`;
        }

       html += `

            ${formok}
          </form>
        </div>
        `;

      }else{

        formok1 += `
          <tr>
              <td class="left aligned"><strong>${key}:</strong> <span style="margin-left:5px;">${json[key]}</span></td>
            </tr>`;

    

      }

    }
    

    if(formok1 !== ''){

      var bodyfinal = `
      <div class="ui text container">
        <div class="ui section divider"></div>
        <h4 class="ui top attached block header" id="msgbody">
        </h4>
        <div class="ui attached segment">
          <table class="ui very basic table">
      <tbody>`;

      bodyfinal += formok1;
      bodyfinal += `
      </tbody>
          </table>
        </div>
        <h4 class="ui bottom attached block header">
          <center>
            <div class="ui buttons">
              <button class="ui button">Voltar</button>
              <div class="or"></div>
              <button class="ui positive button">Editar</button>
            </div>
          </center>
        </h4>
      </div>
      `;

      return bodyfinal;

    }else{
      return buildViewAll(json);
    }


};


const buildViewAll = (json) => {
    if(typeof json === 'string') {
        json = JSON.parse(json);
    }
    var html = '';
    var formok1 = '';

    for(let key in json) {

      if(typeof json[key] === 'object') {
        let zoneTitle = key;

        var formok = '';
        for (var key0 in json[key]) { 
            formok += `
            <tr>
              <td class="left aligned"><strong>${key0}</storng><span style="margin-left:10px">${json[key][key0]}<span></td>
            </tr>`;
        }

       html += `


<div class="ui text container">
  <div class="ui section divider"></div>
  <h4 class="ui top attached block header">
    ${zoneTitle}
    </h4>
  <div class="ui attached segment">
    <table class="ui very basic table">
      <tbody>
        ${formok}
      </tbody>
    </table>
  </div>
  <h4 class="ui bottom attached block header">
    <center>
      <div class="ui buttons">
        <button class="ui button">Voltar</button>
        <div class="or"></div>
        <button class="ui positive button">Editar</button>
      </div>
    </center>
  </h4>
</div>
        `;

      }else{
        formok1 += `
        <div class="field">
            <label>${key}</label>
            <input type="text" name="${key}" placeholder="${json[key]}">
        </div>`;

      }
    }
    if(formok1 !== ''){
      return buildView(json);
    }else{
      return html;
    }
}

const buildFrm = (json) => {
    if(typeof json === 'string') {
        json = JSON.parse(json);
    }
    var html = '';
    var formok1 = '';

    for(let key in json) {

      if(typeof json[key] === 'object') {
        let zoneTitle = key;

        var formok = '';
        for (var key0 in json[key]) { 
            formok += `
            <div class="field">
                <label>${key0}</label>
                <input type="text" name="${key0}" placeholder="${json[key][key0]}">
            </div>`;
        }

       html += `

        <div class="ui black table">
          <form class="ui form attached fluid segment frmtemplateok">
            <h2 class="ui dividing header">${zoneTitle}</h2>
            ${formok}
          </form>
        </div>
        `;

      }else{
        formok1 += `
        <div class="field">
            <label>${key}</label>
            <input type="text" name="${key}" placeholder="${json[key]}">
        </div>`;

      }
    }
    if(formok1 !== ''){
      return ` <div class="ui centered grid"><div class="ui black table ui twelve wide computer column">
          <form class="ui form attached fluid segment frmtemplateok">
            ${formok1}
          </form>
        </div></div>`;
    }else{
      console.log(html);
      return html;
    }
}

//============================================================================//

const addHtml = (onde, html) => {
  var elemento_pai = document.querySelector(onde);
  elemento_pai.insertAdjacentHTML('beforeend', html);
}

//============================================================================//

const addObjHtml = (onde, html) => {
  var elemento_pai = document.querySelector(onde);
      elemento_pai.appendChild(html);

//  elemento_pai.insertAdjacentHTML('beforeend', html);
}

//============================================================================//

const adicionarElemento = (onde='', tipo='div', clas='', html='') => {
  if(onde === '') {
    var elemento_pai = document.body;
  }else{
    var elemento_pai = document.querySelector(onde);
  }
  var div = document.createElement(tipo);

  if(clas !== '') {
      div.setAttribute('class', clas);
  }

  if(html !== '') {
    if(html.includes('>')) {
      div.innerHTML = html;
    }else{
      div.textContent = html;
    }
  }
  elemento_pai.appendChild(div);
};

//============================================================================//

const addTitulo = (t) => {
	var el = document.querySelector('title');
	el.textContent = t;
};

//============================================================================//

const replac = (b, str, strnovo) => {
  return b.replace(`{{${str}}}`, strnovo);
}

//============================================================================//

function replaceMe(template, data) {
    const pattern = /\{(.*?)\}/g; // {property}
    return template.replace(pattern, (match, token) => data[token]);
}

//============================================================================//

//============================================================================//

const app = {
  getHtml: getHtml,
  addEl:   adicionarElemento,
  addHtml: addHtml,
  appNome: addTitulo,
  addVar:  replac,
  setVars: replaceMe,
  form:     form,
  addForm:  addForm,
  createTable: createTable,
  addObjHtml:  addObjHtml,
  buildFrm: buildFrm,
  buildView: buildView
};

