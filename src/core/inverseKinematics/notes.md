## Inverse Kinematics

1. Find the x0_3, y0_3 and Z0_3 based on end effector

- https://youtu.be/NDEEKGEQylg?t=1439
- https://www.youtube.com/watch?v=Is50EWYF99I&t=570s

We need fo find the x0_3, y0_3 and Z0_3

```
      ( )
      / \
     /   \ a5
    /     \
  [ ]     [ ]
   |         \ a6
  ( )         \
   |          ef = end effector vector
  ( )
   |
  [ ]
```

goal: find the x, y, z for the wrist centerpoint

`wc = ef - (a5 + a6) * R0_6`

or

`vector0_3 = vector0_6 - wrist_offset_vector * R0_6`
