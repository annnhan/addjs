cd ~/project/addjs/src &&\
zip -r addjs.zip * **\
mv addjs.zip ../ &&\
cd ~/project/hanan198501.github.io/assets/download/ &&\
cp ~/project/addjs/src.crx ~/project/hanan198501.github.io/assets/download/addjs.crx &&\
zip addjs.zip addjs.crx &&\
git add ./ &&\
git git commit -am "add download" &&\
git push
