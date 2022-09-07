from matplotlib import pyplot as plt
import numpy as np
import cv2 as cv
import imutils
import sys

img = cv.imread('../images/brickImage_09.png')
if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

blank = np.zeros(img.shape[:2], dtype='uint8')
b,g,r = cv.split(img)
red = cv.merge([r,r,r])
cv.imshow('Red', red)

img_gray = cv.cvtColor(red, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', img_gray)

ret, img_thresh = cv.threshold(img_gray, 228, 255, cv.THRESH_BINARY_INV)
print("ret: ", ret)
cv.imshow('Binary', img_thresh)

kernel = np.ones((4,4), np.uint8)
erode = cv.erode(img_thresh, kernel, iterations = 2)
cv.imshow('Erode', erode)

morpho = cv.morphologyEx(erode, cv.MORPH_ERODE, kernel)
cv.imshow('Morfologia', morpho)

dilation = cv.dilate(morpho, kernel, iterations = 1)
cv.imshow("Dilation", dilation)

contours = cv.findContours(dilation, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)

def rescaleFrame(frame, scale=0.5):
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)
    dimensions = (width, height)
    return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

def _flag(image, contours):
    for (i, c) in enumerate(contours):
        ((x, y), _) = cv.minEnclosingCircle(c)
        cv.drawContours(image, [c], -1, (255, 55, 55), 2)
        
if __name__ == "__main__":
    _flag(img, contours)
    print(f"Numero de tijolo: {len(contours)}")
    cv.imshow('Image', img)
    img_resized = rescaleFrame(img)
    cv.imshow('Image', img_resized)
    print('Version: ' + cv.__version__)
    cv.waitKey(0)