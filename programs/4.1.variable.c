/*
	Name: p3.triangle1.c
	Description: Area of a triangle
 */
#include <stdio.h>

int main() {
	int area_triangle;

	int height = 25;
	int width = 35;

	area_triangle = height * width / 2;

	printf("Area of the triangle of height %d and width %d is %d", height, width, area_triangle);

	return 0;
}
