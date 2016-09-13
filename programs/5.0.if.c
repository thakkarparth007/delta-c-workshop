/*
	Prints the area of a rectangle or triangle,
	depending on the user's choice.
*/
#include <stdio.h>

int main() {
	float area, l, w, b, h;
	int choice;
	printf("Enter 0 for a rectangle and 1 for a triangle\n");
	scanf("%d", &choice);
	if (choice == 0) {
		printf("Enter the length and breadth:\n");
		scanf("%f %f", &l, &w);
		area = l * w;
		printf("The area of the rectangle with length %f and breadth %f is %f\n", l, w, area);
	}
	else if (choice == 1) {
		printf("Enter base and height\n");
		scanf("%f %f", &b, &h);
		area = b * h / 2;
		printf("The area of the triangle with base %f and height %f is %f\n", b, h, area);
	}
	return 0;
}
