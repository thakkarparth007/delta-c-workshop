/*
	Name: p5.input.c
	Description: Input
 */
#include <stdio.h>

int main() {
	float area_triangle;
	float area_rect;

	float height;
	float width;

	printf("Enter the height and the width of the shape: ");
	scanf("%f %f", &height, &width);

	area_rect = height * width;
	area_triangle = height * width / 2;

	printf("Area of the rectangle of height %f and width %f is %f\n", height, width, area_rect);
	printf("Area of the triangle of height %f and width %f is %f\n", height, width, area_triangle);

	return 0;
}