#!/bin/bash

#删除dist
rm -rf dist
echo "====== 删除dist目录完成 ======"

#安装node模块
echo "====== 安装node模块-开始 ======"
cnpm install
echo "====== 安装node模块-完成 ======"

#编译dist目录-生产环境
echo "====== 编译dist目录-生产环境-开始 ======"
npm run build
echo "====== 编译dist目录-生产环境-完成 ======"