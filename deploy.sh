# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run vuepress build .

# 进入生成的文件夹
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git remote add origin https://github.com/kq981024/XY_BLOG.git
# git branch -M master
git push -f https://github.com/kq981024/XY_BLOG.git master:gh-pages

cd -
