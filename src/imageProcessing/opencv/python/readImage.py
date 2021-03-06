import cv2 as cv

img = cv.imread('../assets/img/nemo.jpg')
cv.imshow('Procurando o nemo', img)

gray = cv.cvtColor(img, cv.COLOR_RGB2GRAY)
cv.imshow('Peixe Palhaco Triste', gray)

gray2 = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('Peixe Palhaco Triste 2', gray2)

ret2,th = cv.threshold(gray,0,255,cv.THRESH_BINARY+cv.THRESH_OTSU)
cv.imshow('Peixe Palhaco Vintage', th)

print('Version: ' + cv.__version__)

cv.waitKey(0)