from matplotlib import pyplot as plt
import numpy as np
import cv2 as cv
import imutils
import sys

img = cv.imread('../images/brickImage_09.png')
if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

img_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', img_gray)

img_blur = cv.GaussianBlur(img_gray, (3,3), cv.BORDER_DEFAULT)
cv.imshow('Blur', img_blur)

ret, img_thresh = cv.threshold(img_blur, 150, 255, cv.THRESH_BINARY_INV)
print("ret: ", ret)
cv.imshow('Binary', img_thresh)

img_blur_ = cv.medianBlur(img_thresh, 5)
cv.imshow('Blur_2', img_blur_)

contours = cv.findContours(img_blur_, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)

def _flag(image, contours):
    for (i, c) in enumerate(contours):
        ((x, y), _) = cv.minEnclosingCircle(c)
        cv.drawContours(image, [c], -1, (255, 55, 55), 2)
        
if __name__ == "__main__":
    _flag(img, contours)
    print(f"Numero de tijolo: {len(contours)}")
    cv.imshow('Image', img)
    print('Version: ' + cv.__version__)
    cv.waitKey(0)