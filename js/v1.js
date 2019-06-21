
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
  addObjHtml:  addObjHtml
};

