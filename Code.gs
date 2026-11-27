/**
 * Evaluación de Prácticas Profesionales · ADE — servidor en la nube
 * Guarda en esta Hoja de Google las evaluaciones y firmas de todo el jurado.
 *
 * Cómo instalarlo (una sola vez):
 * 1. Crea una Hoja de Google nueva, por ejemplo "Evaluaciones Prácticas Profesionales".
 * 2. En la hoja: Extensiones → Apps Script. Borra lo que aparezca y pega TODO este archivo.
 * 3. Guarda (ícono de disquete).
 * 4. Implementar → Nueva implementación → tipo "Aplicación web".
 *      Ejecutar como: Yo
 *      Quién tiene acceso: Cualquier usuario
 *    Toca Implementar y autoriza con tu cuenta.
 * 5. Copia la "URL de la aplicación web" (termina en /exec) y pégala en el archivo nube.json
 *    del repositorio:  { "url": "https://script.google.com/macros/s/XXXX/exec" }
 *
 * Una fila por evaluador y practicante. La columna "Datos" la usa la página: no la edites a mano.
 */
var SHEET = 'Evaluaciones';
var HEAD = ['Clave', 'Evaluador', 'Practicante', 'Actualizado', 'Firmada', 'Calificación', 'Folio', 'Comentarios', 'Datos (no editar)'];

function sheet_() {
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheetByName(SHEET);
  if (!s) {
    s = ss.insertSheet(SHEET);
    s.appendRow(HEAD);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, HEAD.length).setFontWeight('bold').setBackground('#ff6a1f').setFontColor('#ffffff');
    s.setColumnWidth(2, 220); s.setColumnWidth(3, 220); s.setColumnWidth(8, 320);
    s.hideColumns(1); s.hideColumns(9);
  }
  return s;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action !== 'list') return out_({ ok: true, app: 'Evaluación de Prácticas Profesionales', mensaje: 'Servidor activo' });
  var v = sheet_().getDataRange().getValues(), rows = [];
  for (var i = 1; i < v.length; i++) {
    var key = String(v[i][0] || ''), cut = key.indexOf('|');
    if (cut < 0) continue;
    try {
      var ev = JSON.parse(v[i][8]);
      rows.push({ who: key.slice(0, cut), sid: key.slice(cut + 1), ts: ev.ts || '', ev: ev });
    } catch (err) {}
  }
  return out_({ ok: true, rows: rows });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.action !== 'save' || !body.items) return out_({ ok: false, error: 'Solicitud no válida' });
    var s = sheet_(), v = s.getDataRange().getValues(), idx = {};
    for (var i = 1; i < v.length; i++) idx[String(v[i][0])] = i + 1;
    body.items.forEach(function (it) {
      if (!it || !it.who || !it.sid || !it.ev || !it.ts) return;
      var key = it.who + '|' + it.sid, ev = it.ev;
      ev.ts = it.ts;
      var row = [key, it.wn || it.who, it.sn || it.sid, new Date(it.ts),
        ev.signedAt ? 'Sí' : 'No', ev.signedAt && ev.total != null ? ev.total : '', ev.folio || '', ev.note || '', JSON.stringify(ev)];
      var r = idx[key];
      if (r) {
        var oldTs = '';
        try { oldTs = JSON.parse(v[r - 1][8]).ts || ''; } catch (x) {}
        if (oldTs && oldTs > it.ts) return; // ya hay una versión más reciente
        s.getRange(r, 1, 1, row.length).setValues([row]);
      } else {
        s.appendRow(row);
        idx[key] = s.getLastRow();
      }
    });
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
