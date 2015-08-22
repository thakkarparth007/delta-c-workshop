/*
	Name: p2.rect.c
	Description: Area of a rectangle
 */
#include <stdio.h>

int main() {
	int area_rect;

	int height = 25;
	int width = 35;

	area_rect = height * width;

	printf("Area of the rectangle of height %d and width %d is %d", height, width, area_rect);

	return 0;
}
