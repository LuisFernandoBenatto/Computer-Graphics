from matplotlib import pyplot as plt
import numpy as np
import cv2 as cv
import imutils
import sys

img = cv.imread('../images/brickImage_02.jpeg')
if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)
cv.imshow("HSV", hsv)
# h, s, v = cv.split(hsv)
# v += 200
# final_hsv = cv.merge((h, s, v))
# img_hsv = cv.cvtColor(final_hsv, cv.COLOR_HSV2BGR)
# cv.imshow("cvtColor", img_hsv)

# img_blur_ = cv.medianBlur(hsv, 5)
# cv.imshow('Blur_2', img_blur_)

img_blur = cv.GaussianBlur(hsv, (3,3), cv.BORDER_DEFAULT)
cv.imshow('Blur', img_blur)

blank = np.zeros(img.shape[:2], dtype='uint8')
b,g,r = cv.split(img_blur)
red = cv.merge([r,r,r])
cv.imshow('Red', red)

img_gray = cv.cvtColor(red, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', img_gray)

ret, img_thresh = cv.threshold(img_gray, 150, 255, cv.THRESH_BINARY_INV)
print("ret: ", ret)
cv.imshow('Binary', img_thresh)

kernel = np.ones((3,3), np.uint8)

# erode = cv.erode(img_thresh, kernel, iterations = 1)
# cv.imshow('Erode', erode)

morpho = cv.morphologyEx(img_thresh, cv.MORPH_ERODE, kernel)
cv.imshow('Morfologia', morpho)

# img_blur_ = cv.medianBlur(morpho, 5)
# cv.imshow('Blur_2', img_blur_)

dilation = cv.dilate(morpho, kernel, iterations = 1)
cv.imshow("Dilation", dilation)

# img_blur_ = cv.medianBlur(dilation, 5)
# cv.imshow('Blur_2', img_blur_)

invert = cv.bitwise_not(dilation)
cv.imshow('bitwise_not', invert)

erode = cv.erode(invert, kernel, iterations = 3)
cv.imshow('Erode', erode)

# opening = cv.morphologyEx(erode, cv.MORPH_OPEN, kernel)
# cv.imshow('opening', opening)

contours = cv.findContours(erode, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)

def _flag(image, contours):
    for (i, c) in enumerate(contours):
        ((x, y), _) = cv.minEnclosingCircle(c)
        cv.drawContours(image, [c], -1, (0, 255, 0), 2)

if __name__ == "__main__":
    _flag(img, contours)
    print(f"Numero de tijolo: {len(contours)}")
    cv.imshow('Image', img)
    print('Version: ' + cv.__version__)
    cv.waitKey(0)