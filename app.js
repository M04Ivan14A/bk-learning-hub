
const KEY='bkLearningHubV1';const data=JSON.parse(localStorage.getItem(KEY)||'{}');data.steps=data.steps||{};data.answers=data.answers||{};const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];function save(){localStorage.setItem(KEY,JSON.stringify(data))}function identity(){const f={studentName:'name',studentClass:'className',studentGroup:'group'};Object.entries(f).forEach(([id,k])=>{const e=document.getElementById(id);e.value=data[k]||'';e.addEventListener('input',()=>{data[k]=e.value;save()})})}function progress(){const n=[1,2,3,4,5].filter(x=>data.steps[x]).length;$('#progressText').textContent=`${n}/5 selesai`;$('#progressBar').style.width=`${n/5*100}%`;$$('.complete').forEach(b=>{const ok=!!data.steps[b.dataset.step];b.classList.toggle('done',ok);b.textContent=ok?'✓ Selesai':'✓ Tandai Selesai'})}$$('.complete').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.step;data.steps[n]=!data.steps[n];save();progress()}));function answers(){$$('textarea').forEach(e=>{e.value=data.answers[e.name]||'';e.addEventListener('input',()=>{data.answers[e.name]=e.value;save()})})}$('#downloadAnswers').addEventListener('click',()=>{const name=data.name||'[Nama belum diisi]',cls=data.className||'[Kelas belum diisi]',grp=data.group||'[Kelompok belum diisi]';let t=`ASESMEN AKHIR BERPIKIR KOMPUTASIONAL
Nama: ${name}
Kelas: ${cls}
Kelompok: ${grp}

`;for(let i=1;i<=5;i++)t+=`SOAL ${i}
${data.answers['q'+i]||'[Belum dijawab]'}

`;const blob=new Blob([t],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`Asesmen_BK_${name.replace(/[^\w\-]+/g,'_')}.txt`;a.click();URL.revokeObjectURL(a.href)});$('#printAnswers').addEventListener('click',()=>window.print());identity();answers();progress();
