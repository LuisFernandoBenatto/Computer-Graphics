from operator import invert
from matplotlib import pyplot as plt
import numpy as np
import cv2 as cv
import imutils
import sys

img = cv.imread('../images/paredeExternaUenpComSol.jpeg')
# img = cv.imread('../images/paredeExternaUenp.jpeg')
# img = cv.imread('../images/pisoSegundoAndarUenp.jpeg')
if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

# blank = np.zeros(img.shape[:2], dtype='uint8')

# b,g,r = cv.split(img)

# blue = cv.merge([b,blank,blank])
# cv.imshow('Blue', blue)
# green = cv.merge([blank,g,blank])
# cv.imshow('Green', green)
# red = cv.merge([blank,blank,r])
# cv.imshow('Red', red)

hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)
cv.imshow("HSV", hsv)
# h, s, v = cv.split(hsv)
# v += 255
# final_hsv = cv.merge((h, s, v))
# img_hsv = cv.cvtColor(final_hsv, cv.COLOR_HSV2BGR)
# cv.imshow("cvtColor", img_hsv)

img_gray = cv.cvtColor(hsv, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', img_gray)

ret, img_thresh = cv.threshold(img_gray, 130, 255, cv.THRESH_BINARY)
print("ret: ", ret)
cv.imshow('Binary', img_thresh)

img_blur = cv.GaussianBlur(img_thresh, (3,3), cv.BORDER_DEFAULT)
cv.imshow('Blur', img_blur)

kernel = np.ones((3,3), np.uint8)
# closing = cv.morphologyEx(img_thresh, cv.MORPH_CLOSE, kernel)
# cv.imshow('morphologyEx', closing)

# invert = cv.bitwise_not(img_thresh)
# cv.imshow('bitwise_not', invert)

# morph_gradient = cv.morphologyEx(invert, cv.MORPH_GRADIENT, kernel)
# cv.imshow('morphologyEx', morph_gradient)

# img_blur_ = cv.medianBlur(img_thresh, 5)
# cv.imshow('Blur_2', img_blur_)

# ret, img_thresh = cv.threshold(img_blur, 90, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)
# print("ret: ", ret)
# cv.imshow('Binary', img_thresh)

erode = cv.erode(img_thresh, kernel, iterations = 4)
cv.imshow('Erode', erode)

# morpho = cv.morphologyEx(erode, cv.MORPH_ERODE, kernel)
# cv.imshow('Morfologia', morpho)

# dilation = cv.dilate(img_thresh, kernel, iterations = 12)
# cv.imshow("Dilation", dilation)

# invert = cv.bitwise_not(dilation)
# cv.imshow('bitwise_not', invert)

contours = cv.findContours(erode, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)

def rescaleFrame(frame, scale=0.5):
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)
    dimensions = (width, height)
    return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

def _flag(image, contours):
    for (i, c) in enumerate(contours):
        ((x, y), _) = cv.minEnclosingCircle(c)
        cv.drawContours(image, [c], -1, (0, 255, 0), 2)

if __name__ == "__main__":
    _flag(img, contours)
    print(f"Numero de tijolo: {len(contours)}")
    cv.imshow('Image', img)
    img_resized = rescaleFrame(img)
    cv.imshow('Image', img_resized)

    print('Version: ' + cv.__version__)
    cv.waitKey(0)
    cv.destroyAllWindows()