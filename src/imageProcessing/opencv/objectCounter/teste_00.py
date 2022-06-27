import numpy as np
import cv2 as cv
import sys
img = cv.imread('./assets/imgs/img_1.jpg')

if img is None:
    sys.exit("Could not read the image.")

imgray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
ret, thresh = cv.threshold(imgray, 127, 255, 0)
cv.imshow('Teste', thresh)
contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)


print('Version: ' + cv.__version__)
cv.waitKey(0)