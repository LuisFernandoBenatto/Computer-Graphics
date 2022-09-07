import cv2 as cv
import random

img = cv.imread('../images/wall.jpg')
if img is None:
    sys.exit("Could not read the image!")
cv.imshow('Original Image', img)

# To hsv
hsv =cv.cvtColor(img,cv.COLOR_BGR2HSV)
cv.imshow('HSV', hsv)

# Get the Saturation out
S=hsv[:,:,1]

# Threshold it
(ret,img_thresh)=cv.threshold(S,42,255,cv.THRESH_BINARY)
cv.imshow('threshold',img_thresh)

# Find contours
contours, h = cv.findContours(img_thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
# contours = cv.findContours(img_thresh, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

#img2 = img.copy()

for c in contours:
    area = cv.contourArea(c)
    # Only if the area is not miniscule (arbitrary)
    if area > 100:
        (x, y, w, h) = cv.boundingRect(c)

        # Uncomment if you want to draw the conours
        cv.drawContours(img, [c], -1, (255, 255, 255), 2)

        # Get random color for each brick
        tpl = tuple([random.randint(0, 255) for _ in range(3)])
        cv.rectangle(img, (x, y), (x + w, y + h), tpl, -1)

cv.imshow("bricks", img)
cv.waitKey(0)