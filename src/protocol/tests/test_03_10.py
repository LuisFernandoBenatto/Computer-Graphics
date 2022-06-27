from matplotlib import pyplot as plt
import numpy as np
import cv2 as cv
import imutils
import sys

img = cv.imread('../images/brickImage_03.jpeg')
# img = cv.imread('../images/brickImage_10.webg')
if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

img_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', img_gray)

img_blur = cv.GaussianBlur(img_gray, (3,3), cv.BORDER_DEFAULT)
cv.imshow('Blur', img_blur)

ret, img_thresh = cv.threshold(img_blur, 90, 255, cv.THRESH_BINARY)
print("ret: ", ret)
cv.imshow('Binary', img_thresh)

kernel = np.ones((3,3), np.uint8)
erode = cv.erode(img_thresh, kernel, iterations = 2)
cv.imshow('Erode', erode)

morpho = cv.morphologyEx(erode, cv.MORPH_ERODE, kernel)
cv.imshow('Morfologia', morpho)

contours = cv.findContours(morpho, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)

def _flag(image, contours):
    for (i, c) in enumerate(contours):
        ((x, y), _) = cv.minEnclosingCircle(c)
        cv.drawContours(image, [c], -1, (0, 255, 0), 2)

_flag(img, contours)
print(f"Numero de tijolo: {len(contours)}")
cv.imshow('Image', img)
print('Version: ' + cv.__version__)
cv.waitKey(0)