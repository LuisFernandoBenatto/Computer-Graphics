import numpy as np
import cv2 as cv
import imutils
import sys

img = cv.imread('../images/paredeExternaUenpComSol.jpeg')

if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)
cv.imshow("HSV", hsv)

img_gray = cv.cvtColor(hsv, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', img_gray)

ret, img_thresh = cv.threshold(img_gray, 130, 255, cv.THRESH_BINARY)
print("ret: ", ret)
cv.imshow('Binary', img_thresh)

kernel = np.ones((3,3), np.uint8)

erode = cv.erode(img_thresh, kernel, iterations = 4)
cv.imshow('Erode', erode)

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
    print(f"Número de tijolos: {len(contours)}")
    cv.imshow('Image', img)
    img_resized = rescaleFrame(img)
    cv.imshow('Image', img_resized)

    print('Version: ' + cv.__version__)
    cv.waitKey(0)
    cv.destroyAllWindows()