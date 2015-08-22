/*
	Name: p4.triangle2.c
	Description: Area of a triangle
 */
#include <stdio.h>

int main() {
	float area_triangle;

	int height = 25;
	int width = 35;

	area_triangle = height * width / 2;

	printf("Area of the triangle of height %d and width %d is %f", height, width, area_triangle);

	return 0;
}